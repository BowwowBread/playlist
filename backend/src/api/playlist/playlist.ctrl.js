import youtubeApi from '../../lib/youtube';
import PlayList from '../../models/PlayList';

const getAllPlayList = async (ctx) => {
  const PlayLists = await PlayList.findAll();
  console.log(PlayLists);
  ctx.body = PlayLists;
};
const fetchingPlayList = async (playList) => {
  const fetchPlayList = await Promise.all(playList.items.map(async (item) => {
    const { id } = item;
    const {
      channelId, channelTitle, description, publishedAt: date, title
    } = item.snippet;
    const { url: thumbnail } = item.snippet.thumbnails.default;
    const fetchMyPlayList = await PlayList.findById(id);
    if (fetchMyPlayList != null) {
      return fetchMyPlayList;
    }
    return {
      id,
      channelId,
      channelTitle,
      description,
      date,
      title,
      thumbnail,
      shared: false,
      category: []
    };
  }));
  return fetchPlayList;
};
const getMyPlayList = async (ctx) => {
  const { accessToken } = ctx.req.user;
  const playList = await youtubeApi.getPlayList(accessToken);
  const res = await fetchingPlayList(playList);
  ctx.body = res;
};

const sharePlayList = async (ctx) => {
  const { playList, selectCategory } = ctx.request.body;
  const sharedPlayList = await PlayList.share(await Object.assign(playList, {
    category: selectCategory,
    shared: true
  }));
  console.log(sharedPlayList);
  ctx.body = sharedPlayList;
};

exports.getAllPlayList = getAllPlayList;
exports.getMyPlayList = getMyPlayList;
exports.getAllPlayList = getAllPlayList;
exports.sharePlayList = sharePlayList;