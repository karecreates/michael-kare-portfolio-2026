'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, imageVariants }) {
  const reduceMotion = useReducedMotion();
  const usePairAnimation = Boolean(imageVariants) && !reduceMotion;

  const imageWrap = usePairAnimation ? (
    <motion.div className={styles.imageWrap} variants={imageVariants}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 760px) 100vw, 50vw"
        className={styles.image}
      />
    </motion.div>
  ) : (
    <div className={styles.imageWrap}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 760px) 100vw, 50vw"
        className={styles.image}
      />
    </div>
  );

  return (
    <article className={styles.card}>
      <Link href={project.href} className={styles.link}>
        <div className={styles.meta}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.category}>{project.category}</p>
        </div>
        {imageWrap}
      </Link>
    </article>
  );
}
