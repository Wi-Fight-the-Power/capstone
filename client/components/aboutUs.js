import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin:'20px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AboutUs() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="col">
      <Card className={classes.root}>
      <CardContent className='aboutUsCard'>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <img src='/cook.png' className='img'></img>
        <Typography variant="h5" component="h2">
          Jeremy Cook
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography variant="body2" component="p">
          When he's not coding, Jeremy is a huge New York Jets fan yeah we don't know why either. He likes esports and gaming in his spare time. He loves using React!
        </Typography>
      </CardContent>
      <CardActions>
        <a href="https://github.com/JC00K"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">GitHub</Button>
        </a>
        <a href="https://www.linkedin.com/in/jeremycook1/"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">Linkedin</Button>
        </a>
      </CardActions>
    </Card>

    <Card className={classes.root}>
      <CardContent className='aboutUsCard'>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <img src='/gay.png' className='img'></img>
        <Typography variant="h5" component="h2">
          Shawn Gay
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography variant="body2" component="p">
          When Shawn is not coding you can find Shawn making his famous steak while jamming on his guitar. Shawn is also into body building. Hes also not a doctor.
        </Typography>
      </CardContent>
      <CardActions>
        <a href="https://github.com/Shawn-Gay"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">GitHub</Button>
        </a>
        <a href="https://www.linkedin.com/in/shawn-gay/"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">Linkedin</Button>
        </a>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardContent className='aboutUsCard'>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <img src='/guan.png' className='img'></img>
        <Typography variant="h5" component="h2">
          William Guan
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography variant="body2" component="p">
          When he's not coding, William is trying to perfect his ramen recipe to perfection. His hobbies are cooking traveling and trying out new experiences.
        </Typography>
      </CardContent>
      <CardActions>
        <a href="https://github.com/williamg1750"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">GitHub</Button>
        </a>
        <a href="https://www.linkedin.com/in/william-guan/"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">Linkedin</Button>
        </a>
      </CardActions>
    </Card>

    <Card className={classes.root}>
      <CardContent className='aboutUsCard'>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <img src='/watson.png' className='img'></img>
        <Typography variant="h5" component="h2">
          William Watson
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography variant="body2" component="p">
          When he's not coding you can find William at the golf course swinging the iron with platters of Popeyes Chicken Sandwiches. Hes also not a doctor.
        </Typography>
      </CardContent>
      <CardActions>
        <a href="https://github.com/Will-Watson"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">GitHub</Button>
        </a>
        <a href="https://www.linkedin.com/in/williampwatson/"  target='_blank' style={{ textDecoration: 'none'}} rel="noreferrer">
          <Button size="small">Linkedin</Button>
        </a>
      </CardActions>
    </Card>
    </div>

  );
}
