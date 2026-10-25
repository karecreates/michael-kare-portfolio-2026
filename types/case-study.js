/**
 * Shared case-study content schema.
 *
 * @typedef {Object} CaseStudyAsset
 * @property {string} src
 * @property {string} alt
 * @property {number} [width]
 * @property {number} [height]
 * @property {'contain'|'cover'} [objectFit]
 * @property {boolean} [scrollable]
 * @property {number} [previewHeight]
 * @property {boolean} [priority]
 * @property {boolean} [spin]
 *
 * @typedef {Object} EditorialIntroBlock
 * @property {'editorialIntro'|'editorialText'|'closingStatement'} type
 * @property {'hero'|'section'|'annotation'|'split'|'closing'} [variant]
 * @property {'left'|'right'|'center'|'split'} [placement]
 * @property {string} [heading]
 * @property {string} [body]
 * @property {string} [eyebrow]
 * @property {'intro'|'tight'|'media'|'follow'|'caption'|'section'} [spaceBefore]
 *
 * @typedef {Object} ImageBlock
 * @property {'image'|'fullWidth'|'tallScreenshot'} type
 * @property {CaseStudyAsset} image
 * @property {string} [caption]
 * @property {'left'|'right'|'center'} [captionAlign]
 * @property {'full'|'editorial'|'narrow'} [widthVariant]
 * @property {'intro'|'tight'|'media'|'caption'|'section'} [spaceBefore]
 *
 * @typedef {Object} ImageGridBlock
 * @property {'imageGrid'|'twoColumn'} type
 * @property {CaseStudyAsset[]} images
 * @property {string[]} [columns]
 * @property {boolean} [matchHeight]
 * @property {'intro'|'tight'|'media'|'caption'|'section'} [spaceBefore]
 *
 * @typedef {Object} VideoBlock
 * @property {'video'} type
 * @property {CaseStudyAsset & {autoPlay?: boolean, muted?: boolean, loop?: boolean, poster?: string, controls?: boolean}} video
 * @property {'intro'|'tight'|'media'|'caption'|'section'} [spaceBefore]
 *
 * @typedef {Object} ScrollableScreenshotBlock
 * @property {'scrollableScreenshot'} type
 * @property {CaseStudyAsset} image
 * @property {string} [heading]
 * @property {string} [body]
 * @property {string} [caption]
 * @property {'full'|'split'} [layout]
 * @property {'left'|'right'} [textSide]
 * @property {'autoscroll'|'explore'} [mode]
 * @property {string} [aspect]
 * @property {boolean} [showScrollHint]
 * @property {boolean} [showBottomFade]
 * @property {'top'|'bottom'|number} [initialScrollPosition]
 * @property {string} [radius]
 * @property {string} [ariaLabel]
 * @property {'intro'|'tight'|'media'|'follow'|'caption'|'section'|'chapter'} [spaceBefore]
 *
 * @typedef {Object} PhoneShowcaseBlock
 * @property {'phoneShowcase'} type
 * @property {CaseStudyAsset[]} images
 * @property {'featurePair'|'trio'|'pairThenFeature'} [layout]
 * @property {'left'|'right'} [featureSide]
 * @property {string} [heading]
 * @property {string} [body]
 * @property {'intro'|'tight'|'media'|'follow'|'caption'|'section'|'chapter'} [spaceBefore]
 *
 * @typedef {Object} IdentityDetailBlock
 * @property {'identityDetail'} type
 * @property {CaseStudyAsset} image
 * @property {'small'|'medium'|'large'} [size]
 * @property {'intro'|'tight'|'media'|'caption'|'section'} [spaceBefore]
 *
 * @typedef {Object} ClosingStatementBlock
 * @property {'closingStatement'} type
 * @property {string} heading
 * @property {string} [body]
 * @property {'intro'|'tight'|'media'|'caption'|'section'} [spaceBefore]
 *
 * @typedef {EditorialIntroBlock|EditorialTextBlock|ImageBlock|ImageGridBlock|VideoBlock|ScrollableScreenshotBlock|PhoneShowcaseBlock|IdentityDetailBlock|ClosingStatementBlock} CaseStudyBlock
 *
 * @typedef {Object} CaseStudy
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} [label]
 * @property {string} [description]
 * @property {string[]} [disciplines]
 * @property {string} [year]
 * @property {string} [client]
 * @property {string} [liveUrl]
 * @property {string} [projectType]
 * @property {boolean} [videoFirst]
 * @property {CaseStudyAsset & {autoPlay?: boolean, muted?: boolean, loop?: boolean, poster?: string, controls?: boolean, lead?: boolean, lazy?: boolean, preload?: string, caption?: string}} [leadMedia]
 * @property {{label: string, href: string}} [cta]
 * @property {CaseStudyBlock[]} gallery
 */

export {};
