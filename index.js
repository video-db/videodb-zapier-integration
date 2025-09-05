import packageJson from './package.json' with { type: 'json' };
import zapier from 'zapier-platform-core';
import { authentication } from './authentication.js';

// New Actions
import { addWatermark } from './actions/add_watermark.js';
import { autoChapter } from './actions/auto_chapter.js';
import { autoDub } from './actions/auto_dub.js';
import { createHighlightClip } from './actions/create_highlight_clip.js';
import { generateImage } from './actions/generate_image.js';
import { generateSubtitles } from './actions/generate_subtitles.js';
import { generateVideo } from './actions/generate_video.js';
import { generateVoiceover } from './actions/generate_voiceover.js';
import { instantBotJoin } from './actions/instant_bot_join.js';
import { summarizeVideo } from './actions/summarize_video.js';
import { uploadIndex } from './actions/upload_index.js';

// New Searches
import { findVideoMoment } from './searches/find_video_moment.js';
import { getMeetingAssets } from './searches/get_meeting_assets.js';
import { getTranscript } from './searches/get_transcript.js';
import { getVideoMetadata } from './searches/get_video_metadata.js';
import { videoQna } from './searches/video_qna.js';
import { checkJobStatus } from './searches/read_job.js';

// Triggers
import { getVideosTrigger } from './triggers/get_videos.js';
import { uploadIndexCompletedTrigger } from './triggers/upload_index_completed.js';
import { generateVideoCompletedTrigger } from './triggers/generate_video_completed.js';

export default {
  version: packageJson.version,
  platformVersion: zapier.version,
  authentication,
  triggers: {
    [getVideosTrigger.key]: getVideosTrigger,
    [uploadIndexCompletedTrigger.key]: uploadIndexCompletedTrigger,
    [generateVideoCompletedTrigger.key]: generateVideoCompletedTrigger,
  },
  creates: {
    [addWatermark.key]: addWatermark,
    [autoChapter.key]: autoChapter,
    [autoDub.key]: autoDub,
    [createHighlightClip.key]: createHighlightClip,
    [generateImage.key]: generateImage,
    [generateSubtitles.key]: generateSubtitles,
    [generateVideo.key]: generateVideo,
    [generateVoiceover.key]: generateVoiceover,
    [instantBotJoin.key]: instantBotJoin,
    [summarizeVideo.key]: summarizeVideo,
    [uploadIndex.key]: uploadIndex,
    [findVideoMoment.key]: findVideoMoment,
    [checkJobStatus.key]: checkJobStatus,
    [getTranscript.key]: getTranscript,
  },
  searches: {
    [getMeetingAssets.key]: getMeetingAssets,
    [getVideoMetadata.key]: getVideoMetadata,
    [videoQna.key]: videoQna,
  },
};
