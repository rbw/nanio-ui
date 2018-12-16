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
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '45%',
    maxWidth: 330,
  },
  itemDetails: {
    display: 'block',
    padding: 20,
    paddingTop: 0,
  },
  bodyDescription: {
    fontSize: 16,
    fontStyle: 'italic',
    background: '#fffbec',
    marginBottom: 5,
  },
  expansionFooter: {
    width: '100%',
    fontSize: 14,
    textAlign: 'right',
    padding: '10px 2px 0px 0px',
    color: '#504f4b',
  },
  exampleLink: {
    padding: 0,
    fontSize: 13,
    color: '#6362c5',
    cursor: 'pointer',
    textTransform: 'uppercase',
    '&:hover': {
      color: '#4b2689',
      textShadow: '#e0e0e0 1px 1px 0',
    },
  },
});
