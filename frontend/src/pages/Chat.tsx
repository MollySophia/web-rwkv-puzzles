import {
  Bubble,
  Prompts,
  PromptsProps,
  Sender,
  useXAgent,
  useXChat,
} from '@ant-design/x'
import { BarChartOutlined, BulbOutlined, FullscreenExitOutlined, FullscreenOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Flex, FloatButton, Image, Progress, Row, Slider, Tabs, type GetProp } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { P } from './state_chat'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loadData } from '../func/load'
import { setupWorker } from '../setup_worker'
import { Violin } from '@ant-design/charts'
import Markdown from 'react-markdown'

interface SamplerOptions {
  temperature: number
  top_p: number
  presence_penalty: number
  count_penalty: number
  half_life: number
}

interface StateVisual {
  num_layer: number
  num_head: number
  stats: StateHeadStats[]
  images: string[][]
}

interface StateHeadStats {
  layer: number
  head: number
  bins: number[]
}

const assistant = `User: Hi!

Assistant: Hello! I'm your AI assistant. I'm here to help you with various tasks, such as answering questions, brainstorming ideas, drafting emails, writing code, providing advice, and much more.

User: Could you provide a comprehensive explanation of a project that adheres to the strictest regulatory compliance standards and follows the waterfall methodology? Please describe each of the five stages in detail, including all the specific tasks and deliverables associated with each stage, and use the [ project plan ] data type to clearly and concisely demonstrate your answer. Additionally, could you elaborate on any potential challenges that might arise during the implementation of this project and how they could be addressed?

Assistant: Certainly! Here is a comprehensive explanation of a project that adheres to the strictest regulatory compliance standards and follows the waterfall methodology:
Project Name: Regulatory Compliance System
Project Overview: The goal of this project is to develop a regulatory compliance system for a financial institution that adheres to the strictest regulatory compliance standards. The system will enable the institution to manage regulatory compliance requirements and ensure that all regulatory compliance policies and procedures are followed.
Stage 1: Requirements Gathering and Analysis
Tasks:
- Define project scope and objectives
- Identify stakeholders and gather requirements
- Analyze requirements and determine feasibility
- Create a requirements document
Deliverables:
- Project scope statement
- Stakeholder analysis report
- Requirements document
Project Plan:
| Task | Start Date | End Date | Duration |
|------|-----------|---------|----------|
| Define project scope and objectives | 1/1/2022 | 1/5/2022 | 4 days |
| Identify stakeholders and gather requirements | 1/6/2022 | 1/15/2022 | 10 days |
| Analyze requirements and determine feasibility | 1/16/2022 | 1/25/2022 | 10 days |
| Create a requirements document | 1/26/2022 | 1/31/2022 | 5 days |
Stage 2: Design
Tasks:
- Develop a system architecture
- Create detailed design specifications
- Develop a prototype
- Review and approve design documents
Deliverables:
- System architecture document
- Detailed design specifications document
- Prototype
- Design review report
Project Plan:
| Task | Start Date | End Date | Duration |
|------|-----------|---------|----------|
| Develop a system architecture | 2/1/2022 | 2/10/2022 | 10 days |
| Create detailed design specifications | 2/11/2022 | 2/20/2022 | 10 days |
| Develop a prototype | 2/21/2022 | 2/28/2022 | 7 days |
| Review and approve design documents | 3/1/2022 | 3/5/2022 | 5 days |
Stage 3: Implementation
Tasks:
- Develop code and scripts
- Conduct unit testing
- Conduct integration testing
- Conduct system testing
Deliverables:
- Code and scripts
- Unit test results
- Integration test results
- System test results
Project Plan:
| Task | Start Date | End Date | Duration |
|------|-----------|---------|----------|
| Develop code and scripts | 3/6/2022 | 4/10/2022 | 35 days |
| Conduct unit testing | 4/11/2022 | 4/20/2022 | 10 days |
| Conduct integration testing | 4/21/2022 | 5/5/2022 | 15 days |
| Conduct system testing | 5/6/2022 | 5/20/2022 | 15 days |
Stage 4: Deployment
Tasks:
- Install the system in the production environment
- Conduct user acceptance testing
- Train end-users
- Obtain sign-off from stakeholders
Deliverables:
- Deployed system
- User acceptance test results
- Training materials
- Sign-off document
Project Plan:
| Task | Start Date | End Date | Duration |
|------|-----------|---------|----------|
| Install the system in the production environment | 5/21/2022 | 5/25/2022 | 5 days |
| Conduct user acceptance testing | 5/26/2022 | 6/5/2022 | 10 days |
| Train end-users | 6/6/2022 | 6/15/2022 | 10 days |
| Obtain sign-off from stakeholders | 6/16/2022 | 6/20/2022 | 5 days |
Stage 5: Maintenance and Support
Tasks:
- Provide ongoing maintenance and support
- Conduct periodic system audits and reviews
- Implement updates and enhancements as needed
Deliverables:
- Maintenance and support documentation
- Audit and review reports
- Update and enhancement documentation
Project Plan:
| Task | Start Date | End Date | Duration |
|------|-----------|---------|----------|
| Provide ongoing maintenance and support | 6/21/2022 | Ongoing | N/A |
| Conduct periodic system audits and reviews | 6/21/2022 | Ongoing | N/A |
| Implement updates and enhancements as needed | 6/21/2022 | Ongoing | N/A |
Potential Challenges and Solutions:
- One potential challenge is the complexity of the regulatory compliance requirements. To address this, the project team can engage with regulatory compliance experts and conduct thorough research to ensure that all requirements are identified and addressed.
- Another potential challenge is ensuring that the system is fully compliant with all regulatory standards. To address this, the project team can conduct thorough testing and review by regulatory compliance experts to ensure that all standards are met.
- Additionally, ensuring that end-users are fully trained and understand the system can be a challenge. To address this, the project team can develop comprehensive training materials and conduct thorough training sessions to ensure that end-users are fully prepared to use the system.

User: Can you give a shorter explanation on the project plan?

Assistant: Certainly! Here's a condensed overview of the project plan for the Regulatory Compliance System:
**Project Plan Overview:**
1. **Requirements Gathering and Analysis (Jan 1 - Jan 31)**
   - Define scope, gather stakeholder requirements, analyze feasibility, and create a requirements document.
2. **Design (Feb 1 - Mar 5)**
   - Develop system architecture, create detailed designs, build a prototype, and review/approve design documents.
3. **Implementation (Mar 6 - May 20)**
   - Write code, conduct unit, integration, and system testing, producing test results.
4. **Deployment (May 21 - Jun 20)**
   - Install the system, perform user acceptance testing, train users, and get stakeholder sign-off.
5. **Maintenance and Support (Jun 21 - Ongoing)**
   - Provide continuous support, conduct audits, and implement updates/enhancements.
**Challenges & Solutions:**
- Complexity of compliance requirements: Engage experts and thorough research.
- Ensuring full compliance: Thorough testing and expert reviews.
- User training: Comprehensive materials and sessions.
This plan follows a structured waterfall methodology, ensuring each phase is completed before moving to the next.

User: Generate a unique metaphor for a heavy person.

Assistant: He was a human boulder, immovable and taking up a large amount of space.`

const stops = [24281, 0, 82] // User, Q

const items: PromptsProps['items'] = [
  {
    key: '1',
    icon: <BulbOutlined style={{ color: '#FFD700' }} />,
    description: 'Tell me about the Eiffel Tower.',
  },
  {
    key: '2',
    icon: <BulbOutlined style={{ color: '#FFD700' }} />,
    description: 'How many major planets are there in the Solar System?',
  },
]

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
  },
  local: {
    placement: 'end',
    avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
  },
}

const Chat = () => {
  const [content, setContent] = React.useState('')
  const llmContent = React.useRef('')

  const worker = useRecoilValue(P.worker)
  const stateKey = useRef(new Date().toUTCString())
  const [, setStateValue] = useState<null | Float32Array>(null)
  const [stateVisual, setStateVisual] = useState<null | StateVisual>(null)

  const [samplerOptions, setSamplerOptions] = useState({
    temperature: 2.0,
    top_p: 0.5,
    presence_penalty: 0.5,
    count_penalty: 0.5,
    half_life: 200,
  })
  const samplerOptionsRef = useRef(samplerOptions)
  const updateSamplerOptions = (updated: SamplerOptions) => {
    setSamplerOptions(updated)
    samplerOptionsRef.current = updated
  }

  const onWorkerMessageReceived = (event: any) => {
    if (!event) return
    switch (event.type) {
      case 'state':
        console.log('✅ State updated')
        const { state, visual } = event
        setStateValue(state)
        setStateVisual(visual)
        break
      case 'token':
        const { word, token } = event
        if (stops.includes(token)) {
          console.log(llmContent.current)
          window.onSuccessBinding(llmContent.current)
        } else {
          llmContent.current += word
          window.onUpdateBinding(llmContent.current)
        }
        break
    }
  }

  const initializeApp = () => {
    window.chat = onWorkerMessageReceived
  }

  useEffect(() => {
    initializeApp()
  }, [])

  // Agent for request
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onUpdate }) => {
      if (!message) return
      invoke(worker, message, llmContent.current, stateKey.current, samplerOptionsRef.current)
      window.onUpdateBinding = onUpdate
      window.onSuccessBinding = onSuccess
    },
  })

  // Chat messages
  const { onRequest, messages } = useXChat({
    agent,
  })

  const renderMessages = () => messages.map((message) => ({
    key: message.id,
    role: message.status === 'local' ? 'local' : 'ai',
    content: <Markdown>{message.message}</Markdown>
  }));
  const renderStateStats = () => stateVisual!.stats.flatMap((x) => {
    return [
      { layer: x.layer, head: x.head, value: x.bins[0] },
      { layer: x.layer, head: x.head, value: x.bins[1] },
      { layer: x.layer, head: x.head, value: x.bins[2] },
      { layer: x.layer, head: x.head, value: x.bins[3] },
      { layer: x.layer, head: x.head, value: x.bins[4] },
    ]
  })
  const renderStateImages = () => stateVisual!.images.map((line, layer) =>
    <Row>
      <Col span={1}>Layer {layer}</Col>
      <Col span={23}>
        {
          line.map((code) =>
            <Image
              width={64}
              src={`data:image/png;base64,${code}`}
            />
          )
        }
      </Col>
    </Row>)

  const hasMessages = messages.length > 0
  const hasStateVisual = stateVisual !== null
  const [loaded] = useRecoilState(P.loaded)
  const [stateVisualOpen, setStateVisualOpen] = useState(false)
  const [stateVisualFull, setStateVisualFull] = useState(false)
  const [samplerOptionsOpen, setSamplerOptionsOpen] = useState(false)

  return (
    <Flex
      vertical
      gap='middle'
      style={{
        padding: 12,
        boxSizing: 'border-box',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100vh',
      }}
    >
      {!hasMessages && <Info />}
      {
        hasMessages &&
        <Bubble.List
          style={{ flex: 1 }}
          roles={roles}
          items={renderMessages()}
        />
      }
      {
        loaded && !hasMessages &&
        <Prompts
          title='✨ Inspirational Sparks and Marvelous Tips'
          items={items}
          style={{ marginLeft: 24, marginRight: 24 }}
          onItemClick={(data) => {
            onRequest(data.data.description as string)
            console.log(data)
            setContent('')
            llmContent.current = ''
          }}
          wrap
        />
      }
      <Sender
        disabled={!loaded}
        loading={agent.isRequesting()}
        value={content}
        style={{
          marginLeft: 20,
          marginRight: 20,
          boxSizing: 'border-box',
          width: 'auto',
        }}
        onChange={setContent}
        placeholder='Ask me anything...'
        onSubmit={(nextContent) => {
          onRequest(nextContent)
          setContent('')
          llmContent.current = ''
        }}
      />
      <div style={{ textAlign: 'center', fontSize: 12, color: '#999' }}>
        Disclaimer: This model handles general knowledge, creative writing, and
        basic Python. It may struggle with arithmetic, editing, and complex
        reasoning.
      </div>
      {
        <FloatButton.Group>
          {
            loaded && hasStateVisual &&
            <FloatButton
              icon={<BarChartOutlined />}
              onClick={() => setStateVisualOpen(true)}
            />
          }
          {
            loaded &&
            <FloatButton
              icon={<SettingOutlined />}
              onClick={() => setSamplerOptionsOpen(true)}
            />
          }
        </FloatButton.Group>
      }
      {
        loaded && hasStateVisual &&
        <Drawer
          title='State Visualizer'
          height={stateVisualFull ? '100vh' : 738}
          placement='bottom'
          onClose={() => setStateVisualOpen(false)}
          destroyOnClose={true}
          open={stateVisualOpen}
          extra={
            <Button
              icon={stateVisualFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              onClick={() => setStateVisualFull(!stateVisualFull)}
            />
          }
        >
          <Tabs
            defaultActiveKey='1'
            items={[
              {
                key: '1',
                label: 'Statistics',
                children: <Violin
                  violinType='normal'
                  data={renderStateStats()}
                  xField='head'
                  yField='value'
                  seriesField='layer'
                />
              },
              {
                key: '2',
                label: 'Images',
                children: <>{renderStateImages()}</>
              }
            ]}
          />
        </Drawer>
      }
      {
        loaded &&
        <Drawer
          title='Sampler Options'
          onClose={() => setSamplerOptionsOpen(false)}
          open={samplerOptionsOpen}
        >
          <>
            Temperature
            <Slider
              min={0}
              max={5}
              step={0.1}
              onChange={(value) => updateSamplerOptions({ ...samplerOptions, temperature: value })}
              value={samplerOptions.temperature}
            />
          </>
          <>
            Top P
            <Slider
              min={0}
              max={1}
              step={0.01}
              onChange={(value) => updateSamplerOptions({ ...samplerOptions, top_p: value })}
              value={samplerOptions.top_p}
            />
          </>
          <>
            Presence Penalty
            <Slider
              min={0}
              max={5}
              step={0.1}
              onChange={(value) => updateSamplerOptions({ ...samplerOptions, presence_penalty: value })}
              value={samplerOptions.presence_penalty}
            />
          </>
          <>
            Count Penalty
            <Slider
              min={0}
              max={5}
              step={0.1}
              onChange={(value) => updateSamplerOptions({ ...samplerOptions, count_penalty: value })}
              value={samplerOptions.count_penalty}
            />
          </>
          <>
            Penalty Half Life
            <Slider
              min={1}
              max={2048}
              step={1}
              onChange={(value) => updateSamplerOptions({ ...samplerOptions, half_life: value })}
              value={samplerOptions.half_life}
            />
          </>
        </Drawer>
      }
    </Flex>
  )
}

const invoke = (worker: Worker, message: string, history: string, state: string, sampler: SamplerOptions) => {
  let prompt: string
  if (history === '') prompt = `${assistant}\n\nUser: ${message}\n\nAssistant:`
  else if (history.length >= 2 && history.slice(-2) === '\n\n') prompt = `User: ${message}\n\nAssistant:`
  else prompt = `\n\nUser: ${message}\n\nAssistant:`

  const { temperature, top_p, presence_penalty, count_penalty, half_life } = sampler
  const options = {
    task: 'chat',
    max_len: 2048,
    prompt,
    state_key: state,
    stop_tokens: stops,
    temperature,
    top_p,
    presence_penalty,
    count_penalty,
    penalty_decay: Math.exp(-0.69314718 / Math.max(half_life, 1)),
    vocab: '../assets/rwkv_vocab_v20230424.json',
    sampler: 'nucleus',
  }
  worker.postMessage(JSON.stringify(options))
}

const Info = () => {
  const kDebugMode = process.env.NODE_ENV == 'development'

  const modelUrl = useRecoilValue(P.modelUrl)
  const remoteUrl = useRecoilValue(P.remoteUrl)
  const remoteKey = useRecoilValue(P.remoteKey)
  const [, setLoadedProgress] = useRecoilState(P.loadedProgress)
  const [loading, setLoading] = useRecoilState(P.modelLoading)
  const [loaded, setLoaded] = useRecoilState(P.loaded)
  const [progress] = useRecoilState(P.loadedProgress)
  const [contentLength, setContentLength] = useRecoilState(P.modelSize)
  const [loadedLength, setLoadedLength] = useRecoilState(P.loadedSize)
  const worker = useRecoilValue(P.worker)

  const onClickLoadModel = async () => {
    setLoading(true)
    setLoaded(false)
    const chunks = await loadData(
      "chat",
      kDebugMode ? modelUrl : remoteUrl,
      remoteKey,
      (progress) => {
        setLoadedProgress(progress)
      },
      (contentLength) => {
        setContentLength(contentLength)
      },
      (loadedLength) => {
        setLoadedLength(loadedLength)
      }
    )
    await setupWorker(worker, chunks, 'chat')
    setLoading(false)
    setLoaded(true)
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <img
        src='./assets/logo.png'
        alt='RWKV WebGPU Logo'
        style={{ height: 128 }}
      />
      <div style={{ fontSize: 48, fontWeight: 'bold' }}>RWKV WebGPU</div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          width: 300,
          textAlign: 'center',
        }}
      >
        A blazingly fast and powerful AI chatbot that runs locally in your
        browser.
      </div>
      <div style={{ maxWidth: 410, textAlign: 'left' }}>
        You are about to load{' '}
        <a
          style={{ fontWeight: 700 }}
          href='https://huggingface.co/BlinkDL/rwkv-7-world/tree/main'
        >
          RWKV-x070-World-0.1B
        </a>
        , a 0.1B parameter LLM optimized for in-browser inference. Runs entirely
        in your browser with{' '}
        <a
          style={{ fontWeight: 700 }}
          href='https://github.com/cryscan/web-rwkv'
        >
          Web-RWKV
        </a>
        , so no data is sent to a server. Once loaded, it can be used offline.
      </div>
      <div style={{ maxWidth: 410, textAlign: 'left' }}>
        Note that this demo runs on WebGPU so make sure that your browser
        support it before running (See{' '}
        <a href='https://webgpureport.org/' target='_blank'>
          WebGPU Report
        </a>
        ).
      </div>
      <div style={{ maxWidth: 410, textAlign: 'left' }}>
        Disclaimer: This model handles general knowledge, creative writing, and
        basic Python. It may struggle with arithmetic, editing, and complex
        reasoning.
      </div>
      <div style={{ height: 36 }}></div>

      {loading && (
        <div>
          {(loadedLength / (1000 * 1000)).toFixed(1)}MB /{' '}
          {(contentLength / (1000 * 1000)).toFixed(1)}MB
        </div>
      )}
      {loading && (
        <Progress
          style={{ maxWidth: 300 }}
          percent={progress}
          format={() => ''}
        />
      )}
      {!loaded && (
        <Button
          type='primary'
          size='large'
          onClick={onClickLoadModel}
          loading={loading}
        >
          {loading ? 'Loading...' : 'Load Model'}
        </Button>
      )}
    </div>
  )
}

export default Chat
