export const styles = theme => ({
  root: {
    height: '100vh',
    margin: '0 auto',
    width: '100%',
  },
  contentContainer: {
    width: 'calc(100% - 200px)',
  },
  loadingWrapper: {
    opacity: 1.0,
    color: '#FFFFFF',
  },
  loadingOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: 2000,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingBottom: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 0,
  },
  loadingMessage: {
    color: '#d0d0d0',
    fontSize: 18,
    zIndex: 2000,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Text Me One',
  },
});
