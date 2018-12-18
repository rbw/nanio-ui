export const styles = theme => ({
  root: {
    width: '100%',
    padding: 20,
    paddingRight: 25,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomStyle: 'dashed',
    borderBottomColor: '#c1bfb5',
  },
  groupHeading: {
    marginBottom: 20,
    padding: 2,
    paddingTop: 0,
  },
  itemLeftHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '55%',
    flexShrink: 0,
  },
  itemRightHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
    flexBasis: '45%',
    maxWidth: 330,
  },
  itemDetails: {
    display: 'block',
    padding: 25,
    paddingTop: 0,
  },
  bodyDescription: {
    fontSize: 14,
    // fontStyle: 'italic',
    color: '#4f4e48',
    paddingBottom: 10,
  },
  expansionFooter: {
    width: '100%',
    fontSize: 16,
    textAlign: 'right',
    padding: '15px 2px 0px 0px',
    color: '#484848',
  },
  exampleLink: {
    padding: 0,
    color: '#6362c5',
    '&:hover': {
      cursor: 'pointer',
      color: '#36366c',
    },
  },
});
