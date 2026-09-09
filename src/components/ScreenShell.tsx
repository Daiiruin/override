import type { ReactNode } from 'react'
import { GlitchText } from './GlitchText'
import {
  Page,
  Panel,
  Corner,
  TitleBar,
  HostLabel,
  Logo,
  LiveDot,
  Body,
  TitleWrap,
  Content,
  Divider as StyledDivider,
} from './ScreenShell.styles'

interface ScreenShellProps {
  title: string
  children: ReactNode
}

export function ScreenShell({ title, children }: ScreenShellProps) {
  return (
    <Page>
      <Panel>
        <Corner $pos="tl" aria-hidden="true" />
        <Corner $pos="tr" aria-hidden="true" />
        <Corner $pos="bl" aria-hidden="true" />
        <Corner $pos="br" aria-hidden="true" />
        <TitleBar>
          <HostLabel>
            <Logo src="/nexus_logo.png" alt="" aria-hidden="true" />
            SYS://override
          </HostLabel>
          <LiveDot>● LIVE</LiveDot>
        </TitleBar>
        <Body>
          <TitleWrap>
            <GlitchText as="h1" text={title} />
          </TitleWrap>
          <Content>{children}</Content>
        </Body>
      </Panel>
    </Page>
  )
}

export function Divider() {
  return <StyledDivider />
}
