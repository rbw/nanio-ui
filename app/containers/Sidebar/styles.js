export const styles = theme => ({
  root: {
    maxWidth: 250,
    minWidth: 200,
    height: '100vh',
    backgroundColor: '#343434',
    boxShadow: '1px 1px 5px grey',
    fontFamily: 'monospace',
    fontSize: 15,
  },
  title: {
    background: '#8e4c4c',
    fontFamily: 'Text Me One',
    color: '#f9f9f9',
    borderBottom: '1px solid #633f3f',
    boxShadow: '-3px 2px 8px 0px #3a2424',
    paddingLeft: 25,
    fontSize: 28,
    marginBottom: 15,
    paddingTop: 5,
    fontStyle: 'italic',
  },
  version: {
    fontStyle: 'normal',
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#c6cbc2',
  },
  itemText: {
    color: '#e2e8de',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
  },
  listItem: {
    color: '#a8ada6',
    padding: 0,
    paddingLeft: 20,
    cursor: 'pointer',
  },
  menuIcon: {
    marginRight: 3,
    color: '#a8ada6',
    marginBottom: 2,
  },
  itemTextNested: {
    padding: 0,
    paddingLeft: 20,
    color: '#c4c9c1',
  },
  expandable: {
    color: '#939790',
    paddingRight: 8,
    marginRight: 5,
  },
  nested: {
    fontSize: 14,
    width: 'calc(100% - 2px)',
  },
  indentLevel2: {
    paddingLeft: theme.spacing.unit * 3,
    backgroundColor: '#2b2b2b',
    '&:hover': {
      backgroundColor: '#282828',
    },
  },
  indentLevel3: {
    paddingLeft: theme.spacing.unit * 3.5,
    backgroundColor: '#252525',
    '&:hover': {
      backgroundColor: '#2a2a2a',
    },
  },
  navLink: {
    textDecoration: 'none',
    color: theme.palette.common.black,
  },
  githubLink: {
    paddingBottom: 20,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
  },
  githubLinkIcon: {
    color: '#454545',
    '&:hover': {
      color: '#989c96',
      cursor: 'pointer',
    },
  },
});
