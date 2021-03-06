import {
  App,
  ComponentOptions,
  defineComponent,
  nextTick,
  ref,
  reactive
} from 'vue'
import './index.less'

type This = Options & ComponentOptions

interface Options {
  handler?: () => void
  error: boolean
}

interface Methods extends Options {
  handleError: (
    this: This,
    error: boolean,
    runtimeProps: RuntimeErrorComponentProps
  ) => void
}

interface RuntimeErrorComponentProps {
  title: string
  message: string | unknown
}

export function errorHandle(app: App): void {
  app.config.errorHandler = (err, vm, info) => {
    nextTick(() => {
      if (vm && vm.$root) {
        const ErrorBoundary = (vm.$root.$refs
          .ErrorBoundary as unknown) as Methods
        ErrorBoundary.handleError(true, {
          title: info,
          message: err
        })
      }
    })
  }
}

export const RuntimeErrorComponent = defineComponent({
  props: ['title', 'message'],
  render(this: RuntimeErrorComponentProps & ComponentOptions) {
    const { title, message } = this
    return (
      <div class="error-boundary">
        <h1 class="error-boundary-title">{title}</h1>
        <div class="error-boundary-content">{message}</div>
      </div>
    )
  }
})

export const ErrorBoundary = defineComponent<Options>({
  setup() {
    const error = ref(false)
    const runtimeProps = reactive({})
    return {
      error,
      runtimeProps
    }
  },
  components: {
    RuntimeErrorComponent
  },
  methods: {
    handleError(
      this: This,
      error: boolean,
      runtimeProps: RuntimeErrorComponentProps
    ) {
      this.error = error
      this.runtimeProps = runtimeProps
    }
  } as Methods,
  render(this: This) {
    const { error, runtimeProps } = this
    if (error) {
      return <RuntimeErrorComponent {...runtimeProps}></RuntimeErrorComponent>
    }
    return this.$slots.default && this.$slots.default()
  }
})
