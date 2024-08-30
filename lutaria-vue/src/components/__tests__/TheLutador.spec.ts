import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import TheLutador from '../TheLutador.vue'

describe('TheLutador', () => {
  it('renders properly', () => {
    const wrapper = mount(TheLutador, { props: { nome: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
