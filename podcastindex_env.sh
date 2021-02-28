#! /bin/sh
cat > podcastindex_env.js <<EOF
const podcastindex_env = {
    PODCASTINDEX_KEY:'$PODCASTINDEX_KEY',
    PODCASTINDEX_SECRET:'$PODCASTINDEX_SECRET'
};
module.exports = { podcastindex_env };
EOF
