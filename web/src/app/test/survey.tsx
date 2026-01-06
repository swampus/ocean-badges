'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@nextui-org/button';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Progress } from '@nextui-org/progress';
import { Card } from '@nextui-org/card';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

import { CloseIcon, InfoIcon } from '@/components/icons';
import { type Question } from '@bigfive-org/questions';
import { sleep, formatTimer, isDev } from '@/lib/helpers';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import useTimer from '@/hooks/useTimer';
import { type Answer } from '@/types';

interface SurveyProps {
  questions: Question[];
  nextText: string;
  prevText: string;
  resultsText: string;
  saveTest: Function;
  language: string;
}

export const Survey = ({
  questions,
  nextText,
  prevText,
  resultsText
}: SurveyProps) => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [restored, setRestored] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const { width } = useWindowDimensions();
  const seconds = useTimer();

  useEffect(() => {
    setQuestionsPerPage(window.innerWidth > 768 ? 3 : 1);
  }, [width]);

  useEffect(() => {
    if (localStorage.getItem('inProgress')) {
      restoreDataFromLocalStorage();
    }
  }, []);

  const currentQuestions = useMemo(
    () =>
      questions.slice(
        currentQuestionIndex,
        currentQuestionIndex + questionsPerPage
      ),
    [currentQuestionIndex, questions, questionsPerPage]
  );

  const isTestDone = questions.length === answers.length;
  const progress = Math.round((answers.length / questions.length) * 100);

  const nextButtonDisabled =
    inProgress ||
    currentQuestionIndex + questionsPerPage > answers.length ||
    loading;

  const backButtonDisabled = currentQuestionIndex === 0 || loading;

  async function handleAnswer(id: string, value: string) {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    const newAnswer: Answer = {
      id,
      score: Number(value),
      domain: question.domain,
      facet: question.facet
    };

    setAnswers(prev => [
      ...prev.filter(a => a.id !== id),
      newAnswer
    ]);

    if (questionsPerPage === 1) {
      setInProgress(true);
      await sleep(400);
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setInProgress(false);
    }

    localStorage.setItem(
      'b5data',
      JSON.stringify({ answers, currentQuestionIndex })
    );
    localStorage.setItem('inProgress', 'true');
  }

  function handlePreviousQuestions() {
    setCurrentQuestionIndex(prev => prev - questionsPerPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNextQuestions() {
    setCurrentQuestionIndex(prev => prev + questionsPerPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restoreDataFromLocalStorage() {
    const data = localStorage.getItem('b5data');
    if (!data) return;
    const parsed = JSON.parse(data);
    setAnswers(parsed.answers);
    setCurrentQuestionIndex(parsed.currentQuestionIndex);
    setRestored(true);
  }

  function clearDataInLocalStorage() {
    localStorage.removeItem('inProgress');
    localStorage.removeItem('b5data');
    location.reload();
  }

  async function submitTest() {
    setLoading(true);
    confetti();

    const res = await fetch('/api/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });

    const { id } = await res.json();
    router.push(`/result/${id}`);
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* PROGRESS */}
        <Progress
          value={progress}
          label={formatTimer(seconds)}
          showValueLabel
          size="lg"
          color="secondary"
          className="mb-6"
        />

        {/* RESTORED NOTICE */}
        {restored && (
          <Card className="mb-6 p-4 bg-warning/15">
            <div className="flex items-center gap-3 text-sm">
              <InfoIcon />
              <span>
                Your answers were restored.{' '}
                <button
                  onClick={clearDataInLocalStorage}
                  className="underline"
                >
                  Start a new test
                </button>
              </span>
              <button onClick={() => setRestored(false)}>
                <CloseIcon />
              </button>
            </div>
          </Card>
        )}

        {/* QUESTIONS */}
        {currentQuestions.map(question => (
          <Card
            key={question.id}
            className="mb-8 p-6 shadow-sm ring-1 ring-black/5"
          >
            <h2 className="text-xl font-medium mb-6 leading-snug">
              {question.text}
            </h2>

            <RadioGroup
              onValueChange={value => handleAnswer(question.id, value)}
              value={
                answers.find(a => a.id === question.id)
                  ?.score?.toString() ?? ''
              }
              color="secondary"
              isDisabled={inProgress}
              className="gap-4"
            >
              {question.choices.map(choice => (
                <Radio
                  key={choice.score}
                  value={choice.score.toString()}
                  className="py-2"
                >
                  {choice.text}
                </Radio>
              ))}
            </RadioGroup>
          </Card>
        ))}

        {/* NAVIGATION */}
        <div className="mt-10 flex justify-between items-center gap-4">
          <Button
            variant="light"
            isDisabled={backButtonDisabled}
            onClick={handlePreviousQuestions}
          >
            {prevText}
          </Button>

          <div className="flex gap-3">
            <Button
              color="primary"
              isDisabled={nextButtonDisabled}
              onClick={handleNextQuestions}
            >
              {nextText}
            </Button>

            {isTestDone && (
              <Button
                color="secondary"
                onClick={submitTest}
                isLoading={loading}
              >
                {resultsText}
              </Button>
            )}

            {isDev && (
              <Button variant="light" onClick={() => submitTest()}>
                Dev skip
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
