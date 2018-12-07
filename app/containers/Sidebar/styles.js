export const styles = theme => ({
  root: {
    maxWidth: 250,
    minWidth: 200,
    height: '100vh',
    backgroundColor: '#343434',
    paddingTop: 20,
    boxShadow: '1px 1px 5px grey',
  },
  title: {
    fontFamily: 'Text Me One',
    color: '#f8fff4',
    textAlign: 'center',
    fontSize: 32,
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: '#673333',
    paddingBottom: 15,
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    color: '#e2e8de',
  },
  itemTextNested: {
    fontSize: 17,
    color: '#c4c9c1',
    marginLeft: theme.spacing.unit * 3,
  },
  expandable: {
    color: '#939790',
  },
  nested: {
    boxShadow: '0px 0px 1px 0px #4E4E4E',
    backgroundColor: '#2b2b2b',
  },
});
