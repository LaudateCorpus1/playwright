/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Point, SerializedError, StackFrame } from '@protocol/channels';
import type { Language } from '../../playwright-core/src/server/isomorphic/locatorGenerators';
import type { FrameSnapshot, ResourceSnapshot } from './snapshot';

export type Size = { width: number, height: number };

// Make sure you add _modernize_N_to_N1(event: any) to traceModel.ts.
export type VERSION = 4;

export type BrowserContextEventOptions = {
  viewport?: Size,
  deviceScaleFactor?: number,
  isMobile?: boolean,
  userAgent?: string,
};

export type ContextCreatedTraceEvent = {
  version: number,
  type: 'context-options',
  browserName: string,
  platform: string,
  wallTime: number,
  title?: string,
  options: BrowserContextEventOptions,
  sdkLanguage?: Language,
  testIdAttributeName?: string,
};

export type ScreencastFrameTraceEvent = {
  type: 'screencast-frame',
  pageId: string,
  sha1: string,
  width: number,
  height: number,
  timestamp: number,
};

export type ActionTraceEvent = {
  type: 'action',
  callId: string;
  startTime: number;
  endTime: number;
  apiName: string;
  class: string;
  method: string;
  params: any;
  wallTime: number;
  log: string[];
  snapshots: { title: string, snapshotName: string }[];
  stack?: StackFrame[];
  error?: SerializedError['error'];
  result?: any;
  point?: Point;
  pageId?: string;
};

export type EventTraceEvent = {
  type: 'event',
  time: number;
  class: string;
  method: string;
  params: any;
  pageId?: string;
};

export type ObjectTraceEvent = {
  type: 'object';
  class: string;
  initializer: any;
  guid: string;
};

export type ResourceSnapshotTraceEvent = {
  type: 'resource-snapshot',
  snapshot: ResourceSnapshot,
};

export type FrameSnapshotTraceEvent = {
  type: 'frame-snapshot',
  snapshot: FrameSnapshot,
};

export type TraceEvent =
    ContextCreatedTraceEvent |
    ScreencastFrameTraceEvent |
    ActionTraceEvent |
    EventTraceEvent |
    ObjectTraceEvent |
    ResourceSnapshotTraceEvent |
    FrameSnapshotTraceEvent;