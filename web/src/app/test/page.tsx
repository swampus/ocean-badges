'use client';

import { Survey } from './survey';
import { getItems } from '@bigfive-org/questions';

const saveTest = async (data: any) => {
  return { id: 'local-result' };
};

export default function TestPage() {
  const questions = getItems('en');

  return (
    <Survey
      questions={questions}
      nextText="Next"
      prevText="Back"
      resultsText="Results"
      saveTest={saveTest}
      language="en"
    />
  );
}
