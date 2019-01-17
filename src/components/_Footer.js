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
const shareDescription = 'Learn all about the countries of our world with this fun and challenging game!'
const ShareTitle = 'Place-Trace geo quiz game'
const ShareURL = 'https://place-trace.com'

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="flex">
          <div className="footer-share">
            <FacebookShareButton
              children=<FacebookIcon size={IconSize} round={true}/>
              url={ShareURL}
              hashtag="#placetrace"
            />
            <TwitterShareButton
              children=<TwitterIcon size={IconSize} round={true}/>
              url={ShareURL}
              title={ShareTitle}
              //via={}
              //hashtags={['#placetrace']}
            />
            <GooglePlusShareButton
              children=<GooglePlusIcon size={IconSize} round={true}/>
              url={ShareURL}
            />
            <LinkedinShareButton
              children=<LinkedinIcon size={IconSize} round={true}/>
              url={ShareURL}
              title={ShareTitle}
              description={shareDescription}
            />
            <EmailShareButton
              children=<EmailIcon size={IconSize} round={true}/>
              url={ShareURL}
              subject={ShareTitle}
              body={shareDescription}
            />
          </div>
          <div className="footer-copy">&copy; 2019 <a href="https://thornberrypie.com">ThornberryPie</a></div>
        </div>
      </footer>
    )
  }
}

export default Footer
