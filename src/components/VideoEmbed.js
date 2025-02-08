// src/components/VideoEmbed.js

import React from 'react';

const VideoEmbed = ({ video }) => {
  let embedUrl;

  if (video.platform === 'YouTube') {
    const videoId = new URL(video.url).searchParams.get('v');
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (video.platform === 'Vimeo') {
    const videoId = video.url.split('/').pop();
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  } else if (video.platform === 'Instagram') {
    // Instagram embedding requires oEmbed
    embedUrl = `https://www.instagram.com/p/${video.url.split('/p/')[1]}/embed`;
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>{video.title}</h3>
      {video.platform !== 'Instagram' ? (
        <iframe
          src={embedUrl}
          title={video.title}
          width="100%"
          height="360"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          src={embedUrl}
          title={video.title}
          width="100%"
          height="480"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      )}
      <p>{video.description}</p>
    </div>
  );
};

export default VideoEmbed;