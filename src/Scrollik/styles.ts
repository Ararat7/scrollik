import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  container: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&': {
      scrollbarWidth: 'none',
      '-ms-overflow-style': 'none',
    },
  },
  vTrack: {
    position: 'relative',
    flexShrink: 0,
    flexGrow: 0,
    width: 10,
    height: '100%',
    backgroundColor: 'lavender',
  },
  vThumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'slategrey',
  },
  trackHidden: {
    display: 'none',
  },
}, {
  name: 'scrollik',
});

export default useStyles;
