#! /bin/sh
cat > env.js <<EOF
const env = {
    PODCASTINDEX_KEY:'$PODCASTINDEX_KEY',
    PODCASTINDEX_SECRET:'$PODCASTINDEX_SECRET'
};
module.exports = { env };
EOF
