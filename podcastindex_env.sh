#! /bin/sh
cat > podcastindex_env.js <<EOF
export const PodcastIndexEnv = {
    PODCASTINDEX_KEY: "$PODCASTINDEX_KEY",
    PODCASTINDEX_SECRET: "$PODCASTINDEX_SECRET"
};
EOF
