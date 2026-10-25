'use client';

import { useEffect } from 'react';

export default function CaseStudyDocument() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.caseStudy = 'true';
    return () => {
      delete root.dataset.caseStudy;
    };
  }, []);

  return null;
}
