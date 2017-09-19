import React from 'react'
import Link from 'next/link'

import * as theme from '../theme'
import styled from 'styled-components'

export const height = '70px';

const scrollTransparencyThreshold = 60;

const HeaderWrapper = styled('header')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height};
  box-shadow: ${props => props.transparent ? '0 0 15px rgba(0, 0, 0, 0)' : '0 0 15px rgba(0, 0, 0, 0.1)'};
  padding: ${props => theme.innerSpacing.s1};
  background-color: ${props => !props.transparent && 'white'};
  box-bizing: border-box;
  will-change: background-color, box-shadow;
  transition: background-color 300ms, box-shadow 300ms;
  z-index: 1;
`;

const Content = styled('div')`
  ${theme.maxWidthContainer}
  display: flex;
  align-items: center;
`;

const LinkContainer = styled('div')`
  flex: 2;
  text-align: ${props => props.left ? 'left' : 'right'};
`;

const LinkAnchor = styled('a')`
  color: ${props => props.light ? '#eef' : 'black'};
  mix-blend-mode: ${props => props.light && 'lighten'};
  text-decoration: none;
  margin-left: ${props => props.right && theme.innerSpacing.s1};
  margin-right: ${props => props.left && theme.innerSpacing.s1};
  font-weight: bold;
  transition: color 300ms;
  will-change: color;
  &:hover {
    color: ${props => props.light ? 'white' : theme.colors.text.green};
  }
`

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  render() {
    var { transparent, light } = this.props;

    if (this.state.scrolled) {
      transparent = false;
      light = false;
    }

    return (
      <HeaderWrapper transparent={transparent} light={light}>
        <Content>
          <LinkContainer left>
            <Link href="/features">
              <LinkAnchor href="/features" left light={light}>Features</LinkAnchor>
            </Link>
            <Link href="/screencasts">
              <LinkAnchor href="/screencasts" left light={light}>Screencasts</LinkAnchor>
            </Link>
            <Link href="/support">
              <LinkAnchor href="/support" left light={light}>Support</LinkAnchor>
            </Link>
          </LinkContainer>
          <span>Logo</span>
          <LinkContainer right>
            <Link href="/pricing">
              <LinkAnchor href="/pricing" right light={light}>Pricing</LinkAnchor>
            </Link>
            <Link href="/login">
              <LinkAnchor href="/login" right light={light}>Sign In</LinkAnchor>
            </Link>
            <Link href="/sign-up">
              <LinkAnchor href="/sign-up" right light={light}>Get Started</LinkAnchor>
            </Link>
          </LinkContainer>
        </Content>
      </HeaderWrapper>
    );
  }

  handleWindowScroll = () => {
    if (window.scrollY > scrollTransparencyThreshold) {
      if (!this.state.scrolled) {
        this.setState({scrolled: true});
      }
    } else {
      if (this.state.scrolled) {
        this.setState({scrolled: false});
      }
    }
  }
}