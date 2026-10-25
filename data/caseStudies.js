import { betaAgencyCaseStudy } from './case-studies/beta-agency';
import { folioCaseStudy } from './case-studies/folio';
import { gentleReleaseCareCaseStudy } from './case-studies/gentle-release-care';
import { in2aiCaseStudy } from './case-studies/in2ai';
import { jgAquaticsCaseStudy } from './case-studies/jg-aquatics';
import { jouxCaseStudy } from './case-studies/joux';
import { kimKimbleCaseStudy } from './case-studies/kim-kimble';
import { knowiCaseStudy } from './case-studies/knowi';
import { omtEnterprisesCaseStudy } from './case-studies/omt-enterprises';
import { portfolioCaseStudy } from './case-studies/portfolio';
import { sabioCaseStudy } from './case-studies/sabio';
import { solaceCaseStudy } from './case-studies/solace';
import { sushiEnyaCaseStudy } from './case-studies/sushi-enya';
import { teleidoscopeCaseStudy } from './case-studies/teleidoscope';

function blockHasImage(block) {
  return Boolean(
    block?.image?.src ||
      block?.images?.some((item) => item?.src) ||
      block?.items?.some((item) => item?.image?.src)
  );
}

function blockHasVideo(block) {
  return Boolean(block?.video?.src);
}

/**
 * When a study opts in with `videoFirst` or `leadMedia`, the declared video
 * is marked as the lead and moved ahead of the first still image.
 * Studies that do not opt in, including those with no video, are left as authored.
 */
export function applyVideoLead(study) {
  if (!study || study.videoFirst === false) return study;
  if (study.videoFirst !== true && !study.leadMedia?.src) return study;

  const gallery = [...(study.gallery ?? [])];
  const leadSrc = study.leadMedia?.src;
  let leadIndex = leadSrc
    ? gallery.findIndex((block) => block.video?.src === leadSrc)
    : gallery.findIndex(blockHasVideo);

  if (leadIndex === -1 && leadSrc) {
    gallery.push({
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      video: {
        ...study.leadMedia,
        lead: true,
        priority: true,
        autoPlay: study.leadMedia.autoPlay !== false,
      },
      caption: study.leadMedia.caption,
    });
    leadIndex = gallery.length - 1;
  }

  if (leadIndex === -1) return study;

  const current = gallery[leadIndex];
  const lead = {
    ...current,
    video: {
      ...current.video,
      lead: true,
      priority: true,
      autoPlay: current.video?.autoPlay !== false,
    },
  };
  gallery[leadIndex] = lead;

  const firstImage = gallery.findIndex(blockHasImage);
  if (firstImage !== -1 && firstImage < leadIndex) {
    const [moved] = gallery.splice(leadIndex, 1);
    gallery.splice(firstImage, 0, moved);
  }

  return { ...study, gallery };
}

export const CASE_STUDIES = {
  'in2ai-ai': in2aiCaseStudy,
  'knowi-ai': knowiCaseStudy,
  'beta-agency': applyVideoLead(betaAgencyCaseStudy),
  'jg-aquatics': applyVideoLead(jgAquaticsCaseStudy),
  folio: folioCaseStudy,
  'gentle-release-care': gentleReleaseCareCaseStudy,
  joux: applyVideoLead(jouxCaseStudy),
  'kim-kimble': applyVideoLead(kimKimbleCaseStudy),
  'omt-enterprises': omtEnterprisesCaseStudy,
  'portfolio-website': applyVideoLead(portfolioCaseStudy),
  sabio: sabioCaseStudy,
  solace: solaceCaseStudy,
  'sushi-enya': applyVideoLead(sushiEnyaCaseStudy),
  teleidoscope: teleidoscopeCaseStudy,
};

export function getCaseStudy(slug) {
  return CASE_STUDIES[slug] ?? null;
}

export function getAllCaseStudySlugs() {
  return Object.keys(CASE_STUDIES);
}
