import React, { Component } from 'react'
import {
  EmailIcon,
  FacebookIcon,
  GooglePlusIcon,
  LinkedinIcon,
  TwitterIcon
} from 'react-share'
import {
  EmailShareButton,
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share'

const IconSize = 32
const ShareButtonClass = 'footer-share-button'
const ShareButtonTextClass = 'footer-share-buttontext'
const ShareDescription = 'Learn all about the countries of our world with this fun and challenging game!'
const ShareTitle = 'Place-Trace geo quiz game'
const ShareURL = 'https://place-trace.com'

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="flex">
          <div className="footer-share">
            <FacebookShareButton
              children={
                <div className={ShareButtonClass}>
                  <span className={ShareButtonTextClass}>Share on Facebook</span>
                  <FacebookIcon size={IconSize} round={true}/>
                </div>
              }
              hashtag="#placetrace"
              url={ShareURL}
            />
            <TwitterShareButton
              children=
                <div className={ShareButtonClass}>
                  <span className={ShareButtonTextClass}>Tweet about it</span>
                  <TwitterIcon size={IconSize} round={true}/>
                </div>
              url={ShareURL}
              title={ShareTitle}
            />
            <GooglePlusShareButton
              children=
                <div className={ShareButtonClass}>
                  <span className={ShareButtonTextClass}>Share on Google Plus</span>
                  <GooglePlusIcon size={IconSize} round={true}/>
                </div>
              url={ShareURL}
            />
            <LinkedinShareButton
              children=
                <div className={ShareButtonClass}>
                  <span className={ShareButtonTextClass}>Share on LinkedIn</span>
                  <LinkedinIcon size={IconSize} round={true}/>
                </div>
              url={ShareURL}
              title={ShareTitle}
              description={ShareDescription}
            />
            <EmailShareButton
              children=
                <div className={ShareButtonClass}>
                  <span className={ShareButtonTextClass}>Email to a friend</span>
                  <EmailIcon size={IconSize} round={true}/>
                </div>
              url={ShareURL}
              subject={ShareTitle}
              body={ShareDescription}
            />
          </div>
          <div className="footer-copy">&copy; 2019 <a href="https://thornberrypie.com">ThornberryPie</a></div>
        </div>
      </footer>
    )
  }
}

export default Footer
