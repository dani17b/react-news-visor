import React, { PropTypes } from 'react';
import styles from './articleContainer.scss';

class ArticleContainer extends React.Component {

  constructor(props){
    super(props);
  }

  getArticleAge(){
      let ageInMillis = new Date().getTime() - new Date(this.props.article.publishedAt).getTime();
      let ageInDays = Math.round(ageInMillis / 1000 / 60 / 60 / 24);

      return {
          days : ageInDays,
          label : ageInDays == 1 ? "día" : "días"
      }
  }

  render () {
    let articleAge = this.getArticleAge();
    return (
        <div className={styles.container}>
            <span className={styles.title}>{this.props.article.title}</span>
            <span className={styles.photo} style={{
                backgroundImage : "url("+ this.props.article.urlToImage +")"
            }}></span>
            <div className={styles.author}>
                <div className={styles.authorBlock}>
                    <span className={styles.authorIco}>
                    </span>
                    <span className={styles.authorName}>
                        {this.props.article.author}
                    </span>
                </div>
                <div className={styles.dateBlock}>
                    {"Hace " + articleAge.days + " " + articleAge.label}
                </div>
            </div>
            <span className={styles.description}>{this.props.article.description}</span>
        </div>
    )
  }
}

export default ArticleContainer;
