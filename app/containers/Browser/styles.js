export const styles = theme => ({
  root: {
    padding: 0,
    height: '100vh',
  },
  leftPane: {
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  rightPane: {
    overflowY: 'hidden',
    padding: 35,
    backgroundColor: '#343434',
    boxShadow: '-1px 0px 1px grey',
  },
  rightPaneTitle: {
    fontSize: 24,
    textAlign: 'right',
    textTransform: 'uppercase',
    color: '#202020',
    letterSpacing: 3,
    textShadow: '-1px -1px 1px #222222, 2px 2px 1px #404040',
  },
  rightPaneResponse: {
    marginTop: 20,
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderBottomColor: '#673333',
  },
});
