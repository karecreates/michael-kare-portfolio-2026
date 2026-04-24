'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import styles from './ProjectGrid.module.css';

/** Row container only orchestrates children — no stagger between the two cards */
const ROW_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0
    }
  }
};

/** Smooth “motion graphics” ease — strong deceleration at rest */
const EASE_FLOAT = [0.22, 1, 0.36, 1];

const IMAGE_ROW_ITEM = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: EASE_FLOAT
    }
  }
};

function chunkPairs(items) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

export default function ProjectGrid({ projects }) {
  const reduceMotion = useReducedMotion();
  const rows = chunkPairs(projects);

  return (
    <div className={styles.grid}>
      {rows.map((pair, rowIndex) => {
        const rowKey = pair.map((p) => p.href).join('|');

        if (reduceMotion) {
          return (
            <div key={rowKey} className={styles.row}>
              {pair.map((project, index) => (
                <ProjectCard
                  key={`${rowIndex}-${index}-${project.image}`}
                  project={project}
                />
              ))}
            </div>
          );
        }

        return (
          <motion.div
            key={rowKey}
            className={styles.row}
            variants={ROW_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16, margin: '0px' }}
          >
            {pair.map((project, index) => (
              <ProjectCard
                key={`${rowIndex}-${index}-${project.image}`}
                project={project}
                imageVariants={IMAGE_ROW_ITEM}
              />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
