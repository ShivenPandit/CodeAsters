"use client";

type RafFrame = {
  time: number;
  dt: number;
  smoothedDt: number;
};

type RafCallback = (frame: RafFrame) => void;

const TARGET_FRAME_DT = 1000 / 60;
let rafId: number | null = null;
let lastTimestamp = 0;
let smoothedDt = TARGET_FRAME_DT;
let nextTaskId = 1;

const subscribers = new Set<RafCallback>();
const oneShotTasks = new Map<number, RafCallback>();

function normalizeDt(rawDt: number) {
  let dt = Number.isFinite(rawDt) && rawDt > 0 ? rawDt : TARGET_FRAME_DT;
  dt = Math.min(40, Math.max(8, dt));

  if (Math.abs(dt - TARGET_FRAME_DT) < 0.35) {
    dt = TARGET_FRAME_DT;
  }

  smoothedDt = smoothedDt * 0.85 + dt * 0.15;

  return { dt, smoothedDt };
}

function stopLoop() {
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  lastTimestamp = 0;
  smoothedDt = TARGET_FRAME_DT;
}

function runFrame(timestamp: number) {
  rafId = null;

  const rawDt = lastTimestamp === 0 ? TARGET_FRAME_DT : timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  const { dt, smoothedDt: currentSmoothedDt } = normalizeDt(rawDt);
  const frame: RafFrame = {
    time: timestamp,
    dt,
    smoothedDt: currentSmoothedDt,
  };

  if (oneShotTasks.size > 0) {
    const tasks = Array.from(oneShotTasks.values());
    oneShotTasks.clear();

    tasks.forEach((task) => {
      task(frame);
    });
  }

  if (subscribers.size > 0) {
    subscribers.forEach((subscriber) => {
      subscriber(frame);
    });
  }

  if (subscribers.size > 0 || oneShotTasks.size > 0) {
    rafId = window.requestAnimationFrame(runFrame);
  } else {
    stopLoop();
  }
}

function ensureLoop() {
  if (rafId !== null) return;
  rafId = window.requestAnimationFrame(runFrame);
}

export function scheduleRafTask(callback: RafCallback) {
  const taskId = nextTaskId;
  nextTaskId += 1;

  oneShotTasks.set(taskId, callback);
  ensureLoop();

  return () => {
    oneShotTasks.delete(taskId);
  };
}

export function subscribeRaf(callback: RafCallback) {
  subscribers.add(callback);
  ensureLoop();

  return () => {
    subscribers.delete(callback);

    if (subscribers.size === 0 && oneShotTasks.size === 0) {
      stopLoop();
    }
  };
}
