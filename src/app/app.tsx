import { defineComponent } from 'vue'
import { ErrorBoundary } from '@/components/error-boundary/index'
import { Container } from '@/layout/container'
import { FullScreen } from '@/components/full-screen'
import '../theme/index'
import './app.less'

export default defineComponent({
  render() {
    const { meta } = this.$route
    return (
      <ErrorBoundary ref="ErrorBoundary">
        {meta.full ? <FullScreen></FullScreen> : <Container></Container>}
      </ErrorBoundary>
    )
  }
})
