import { defineComponent } from 'vue'
import { RouteRecordRaw, RouterLink } from 'vue-router'
import classnames from 'classnames'
import { navRouter } from '@/router/index'
import './index.less'

export const Sidebar = defineComponent({
  render() {
    const {
      $router: {
        currentRoute: { value }
      }
    } = this
    return (
      <aside class="sidebar">
        {navRouter.map((routerGroup: RouteRecordRaw) => {
          return (
            <div
              class={classnames('sidebar-nav', {
                'sidebar-nav-active': value.path.includes(routerGroup.path)
              })}
            >
              {routerGroup.meta?.beforeHeader && (
                <header class="sidebar-nav-header">
                  {routerGroup.meta.beforeHeader}
                </header>
              )}
              <RouterLink class="sidebar-nav-name" to={routerGroup.path}>
                {routerGroup.meta?.name}
              </RouterLink>
            </div>
          )
        })}
      </aside>
    )
  }
})
