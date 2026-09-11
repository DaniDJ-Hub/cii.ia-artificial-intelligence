import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload = ({ onChange }: { onChange?: (files: File[]) => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange?.(newFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.warn(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files ?? []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-display text-sm font-semibold text-[var(--text-primary)]">
            Adjunta el brief o especificaciones
          </p>
          <p className="relative z-20 mt-1 text-xs text-[var(--text-muted)]">
            Arrastra un archivo aquí o haz clic para seleccionarlo
          </p>
          <div className="relative mx-auto mt-6 w-full max-w-xl">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={`file-${idx}`}
                  layoutId={idx === 0 ? 'file-upload' : `file-upload-${idx}`}
                  className="relative z-40 mx-auto mt-3 flex w-full flex-col items-start justify-start overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-raised)] p-3"
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.p className="max-w-xs truncate text-sm text-[var(--text-secondary)]">{file.name}</motion.p>
                    <motion.p className="w-fit shrink-0 rounded-md bg-[var(--accent-surface)] px-2 py-0.5 text-xs text-[var(--accent)]">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative z-40 mx-auto mt-2 flex h-24 w-full max-w-[8rem] items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-raised)] group-hover/file:shadow-2xl"
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-1 text-xs text-[var(--text-muted)]"
                  >
                    Suéltalo
                    <IconUpload className="h-4 w-4 text-[var(--accent)]" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-5 w-5 text-[var(--text-muted)]" />
                )}
              </motion.div>
            )}
            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 mx-auto mt-2 flex h-24 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-[var(--accent)] bg-transparent opacity-0"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 24;
  const rows = 6;
  return (
    <div className={cn('flex shrink-0 scale-105 flex-wrap items-center justify-center gap-px')}>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={cn(
                'h-6 w-6 shrink-0 rounded-[2px]',
                index % 2 === 0 ? 'bg-[var(--surface)]' : 'bg-[var(--surface-raised)]',
              )}
            />
          );
        }),
      )}
    </div>
  );
}
