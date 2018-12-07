export const styles = theme => ({
  root: {
    width: '100%',
    padding: 10,
    paddingTop: 0,
    marginBottom: 7,
  },
  groupHeading: {
    padding: 20,
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
    color: '#595dc5',
    cursor: 'pointer',
    textTransform: 'lowercase',
    '&:hover': {
      color: '#3a3c80',
      textDecoration: 'underline',
    },
  },
});
