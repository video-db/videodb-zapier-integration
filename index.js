import packageJson from './package.json' with { type: 'json' };
import zapier from 'zapier-platform-core';
import { authentication } from './authentication.js';

// Collection Actions
import { deleteCollection } from './actions/collections/delete.js';
import { getVideos } from './actions/collections/get_videos.js';
import { getVideo } from './actions/collections/get_video.js';
import { deleteVideo } from './actions/collections/delete_video.js';
import { getAudios } from './actions/collections/get_audios.js';
import { getAudio } from './actions/collections/get_audio.js';
import { deleteAudio } from './actions/collections/delete_audio.js';
import { getImages } from './actions/collections/get_images.js';
import { getImage } from './actions/collections/get_image.js';
import { deleteImage } from './actions/collections/delete_image.js';
import { connectRtstream } from './actions/collections/connect_rtstream.js';
import { getRtstream } from './actions/collections/get_rtstream.js';
import { listRtstreams } from './actions/collections/list_rtstreams.js';
import { generateImage } from './actions/collections/generate_image.js';
import { generateMusic } from './actions/collections/generate_music.js';
import { generateSoundEffect } from './actions/collections/generate_sound_effect.js';
import { generateVoice } from './actions/collections/generate_voice.js';
import { generateVideo } from './actions/collections/generate_video.js';
import { dubVideo } from './actions/collections/dub_video.js';
import { search } from './actions/collections/search.js';
import { searchTitle } from './actions/collections/search_title.js';
import { upload } from './actions/collections/upload.js';
import { makePublic } from './actions/collections/make_public.js';
import { makePrivate } from './actions/collections/make_private.js';

// Video Actions
import { searchVideo } from './actions/videos/search.js';
import { deleteVideo as deleteVideoFromVideoAction } from './actions/videos/delete.js';
import { removeStorage } from './actions/videos/remove_storage.js';
import { generateVideoStream } from './actions/videos/generate_stream.js';
import { generateThumbnail } from './actions/videos/generate_thumbnail.js';
import { getThumbnail } from './actions/videos/get_thumbnail.js';
import { getThumbnails } from './actions/videos/get_thumbnails.js';
import { getTranscript } from './actions/videos/get_transcript.js';
import { getTranscriptText } from './actions/videos/get_transcript_text.js';
import { translateTranscript } from './actions/videos/translate_transcript.js';
import { indexSpokenWords } from './actions/videos/index_spoken_words.js';
import { getScenes } from './actions/videos/get_scenes.js';
import { extractScenes } from './actions/videos/extract_scenes.js';
import { getSceneCollection } from './actions/videos/get_scene_collection.js';
import { listSceneCollection } from './actions/videos/list_scene_collection.js';
import { deleteSceneCollection } from './actions/videos/delete_scene_collection.js';
import { indexScenes } from './actions/videos/index_scenes.js';
import { listSceneIndex } from './actions/videos/list_scene_index.js';
import { getSceneIndex } from './actions/videos/get_scene_index.js';
import { deleteSceneIndex } from './actions/videos/delete_scene_index.js';
import { addSubtitle } from './actions/videos/add_subtitle.js';

// RTStream Actions
import { startRtstream } from './actions/rtstream/start.js';
import { stopRtstream } from './actions/rtstream/stop.js';
import { generateRtstreamStream } from './actions/rtstream/generate_stream.js';
import { indexRtstreamScenes } from './actions/rtstream/index_scenes.js';
import { listRtstreamSceneIndexes } from './actions/rtstream/list_scene_indexes.js';
import { getRtstreamSceneIndex } from './actions/rtstream/get_scene_index.js';
import { getRtstreamScenes } from './actions/rtstream/get_scenes.js';
import { startRtstreamSceneIndex } from './actions/rtstream/start_scene_index.js';
import { stopRtstreamSceneIndex } from './actions/rtstream/stop_scene_index.js';
import { createRtstreamAlert } from './actions/rtstream/create_alert.js';
import { listRtstreamAlerts } from './actions/rtstream/list_alerts.js';
import { enableRtstreamAlert } from './actions/rtstream/enable_alert.js';
import { disableRtstreamAlert } from './actions/rtstream/disable_alert.js';

// Audio Actions
import { generateAudioUrl } from './actions/audios/generate_url.js';
import { deleteAudio as deleteAudioFromAudioAction } from './actions/audios/delete.js';

// Image Actions
import { generateImageUrl } from './actions/images/generate_url.js';
import { deleteImage as deleteImageFromImageAction } from './actions/images/delete.js';

// Client-level Actions
import { getCollection } from './actions/client/get_collection.js';
import { getCollectionsTrigger } from './triggers/get_collections.js';
import { createCollection } from './actions/client/create_collection.js';
import { updateCollection } from './actions/client/update_collection.js';
import { createEvent } from './actions/client/create_event.js';
import { listEvents } from './actions/client/list_events.js';
import { download } from './actions/client/download.js';
import { youtubeSearch } from './actions/client/youtube_search.js';
import { transcode } from './actions/client/transcode.js';

import { getCollections as getCollectionsCreate } from './actions/client/get_collections.js';
import { getAudiosTrigger } from './triggers/get_audios.js';
import { getImagesTrigger } from './triggers/get_images.js';
import { getVideosTrigger } from './triggers/get_videos.js';
import { listRtstreamsTrigger } from './triggers/list_rtstreams.js';

export default {
  version: packageJson.version,
  platformVersion: zapier.version,
  authentication,
  triggers: {
    [getCollectionsTrigger.key]: getCollectionsTrigger,
    [getAudiosTrigger.key]: getAudiosTrigger,
    [getImagesTrigger.key]: getImagesTrigger,
    [getVideosTrigger.key]: getVideosTrigger,
    [listRtstreamsTrigger.key]: listRtstreamsTrigger,
  },
  creates: {
    [deleteCollection.key]: deleteCollection,
    [deleteVideo.key]: deleteVideo,
    [deleteAudio.key]: deleteAudio,
    [deleteImage.key]: deleteImage,
    [connectRtstream.key]: connectRtstream,
    [generateImage.key]: generateImage,
    [generateMusic.key]: generateMusic,
    [generateSoundEffect.key]: generateSoundEffect,
    [generateVoice.key]: generateVoice,
    [generateVideo.key]: generateVideo,
    [dubVideo.key]: dubVideo,
    [upload.key]: upload,
    [makePublic.key]: makePublic,
    [makePrivate.key]: makePrivate,
    [deleteVideoFromVideoAction.key]: deleteVideoFromVideoAction,
    [removeStorage.key]: removeStorage,
    [generateVideoStream.key]: generateVideoStream,
    [generateThumbnail.key]: generateThumbnail,
    [translateTranscript.key]: translateTranscript,
    [indexSpokenWords.key]: indexSpokenWords,
    [extractScenes.key]: extractScenes,
    [deleteSceneCollection.key]: deleteSceneCollection,
    [indexScenes.key]: indexScenes,
    [deleteSceneIndex.key]: deleteSceneIndex,
    [addSubtitle.key]: addSubtitle,
    [startRtstream.key]: startRtstream,
    [stopRtstream.key]: stopRtstream,
    [indexRtstreamScenes.key]: indexRtstreamScenes,
    [startRtstreamSceneIndex.key]: startRtstreamSceneIndex,
    [stopRtstreamSceneIndex.key]: stopRtstreamSceneIndex,
    [createRtstreamAlert.key]: createRtstreamAlert,
    [enableRtstreamAlert.key]: enableRtstreamAlert,
    [disableRtstreamAlert.key]: disableRtstreamAlert,
    [generateAudioUrl.key]: generateAudioUrl,
    [deleteAudioFromAudioAction.key]: deleteAudioFromAudioAction,
    [generateImageUrl.key]: generateImageUrl,
    [deleteImageFromImageAction.key]: deleteImageFromImageAction,
    [listRtstreams.key]: listRtstreams,
    [createCollection.key]: createCollection,
    [updateCollection.key]: updateCollection,
    [createEvent.key]: createEvent,
    [download.key]: download,
    [transcode.key]: transcode,
    [getCollectionsCreate.key]: getCollectionsCreate,
    [listEvents.key]: listEvents,
    [generateRtstreamStream.key]: generateRtstreamStream,
  },
  searches: {
    [getVideos.key]: getVideos,
    [getVideo.key]: getVideo,
    [getAudios.key]: getAudios,
    [getAudio.key]: getAudio,
    [getImages.key]: getImages,
    [getImage.key]: getImage,
    [getRtstream.key]: getRtstream,
    [search.key]: search,
    [searchTitle.key]: searchTitle,
    [searchVideo.key]: searchVideo,
    [getThumbnail.key]: getThumbnail,
    [getThumbnails.key]: getThumbnails,
    [getTranscript.key]: getTranscript,
    [getTranscriptText.key]: getTranscriptText,
    [getScenes.key]: getScenes,
    [getSceneCollection.key]: getSceneCollection,
    [listSceneCollection.key]: listSceneCollection,
    [listSceneIndex.key]: listSceneIndex,
    [getSceneIndex.key]: getSceneIndex,
    [listRtstreamSceneIndexes.key]: listRtstreamSceneIndexes,
    [getRtstreamSceneIndex.key]: getRtstreamSceneIndex,
    [getRtstreamScenes.key]: getRtstreamScenes,
    [listRtstreamAlerts.key]: listRtstreamAlerts,
    [getCollection.key]: getCollection,
    [youtubeSearch.key]: youtubeSearch,
  },
};
