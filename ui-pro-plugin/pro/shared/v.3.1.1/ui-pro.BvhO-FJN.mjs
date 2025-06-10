import 'node:url'
import { kebabCase } from 'scule'
import { addTypeTemplate, addTemplate, hasNuxtModule } from '@nuxt/kit'
import { ofetch } from 'ofetch'
import { readPackageJSON, readGitConfig } from 'pkg-types'

const authForm = {
  slots: {
    root: 'w-full space-y-6',
    header: 'flex flex-col text-center',
    leading: 'mb-2',
    leadingIcon: 'size-8 shrink-0',
    title: 'text-xl text-pretty font-semibold text-highlighted',
    description: 'mt-1 text-base text-pretty text-muted',
    body: 'gap-y-6 flex flex-col',
    providers: 'space-y-3',
    separator: '',
    form: 'space-y-5',
    footer: 'text-sm text-center text-muted mt-2'
  }
}

const banner = options => ({
  slots: {
    root: ['relative z-50 w-full', options.theme.transitions && 'transition-colors'],
    container: 'flex items-center justify-between gap-3 h-12',
    left: 'hidden lg:flex-1 lg:flex lg:items-center',
    center: 'flex items-center gap-1.5 min-w-0',
    right: 'lg:flex-1 flex items-center justify-end',
    icon: 'size-5 shrink-0 text-inverted pointer-events-none',
    title: 'text-sm text-inverted font-medium truncate',
    actions: 'flex gap-1.5 shrink-0 isolate',
    close: 'text-inverted hover:bg-default/10 focus-visible:bg-default/10 -me-1.5 lg:me-0'
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, {
        root: `bg-${color}`
      }])),
      neutral: {
        root: 'bg-inverted'
      }
    },
    to: {
      true: ''
    }
  },
  compoundVariants: [...(options.theme.colors || []).map(color => ({
    color,
    to: true,
    class: {
      root: `hover:bg-${color}/90`
    }
  })), {
    color: 'neutral',
    to: true,
    class: {
      root: 'hover:bg-inverted/90'
    }
  }],
  defaultVariants: {
    color: 'primary'
  }
})

const blogPost = options => ({
  slots: {
    root: 'relative group/blog-post flex flex-col rounded-lg overflow-hidden',
    header: 'relative overflow-hidden aspect-[16/9] w-full pointer-events-none',
    body: 'min-w-0 flex-1 flex flex-col',
    footer: '',
    image: 'object-cover object-top w-full h-full',
    title: 'text-xl text-pretty font-semibold text-highlighted',
    description: 'mt-1 text-base text-pretty',
    authors: 'pt-4 mt-auto flex flex-wrap gap-x-3 gap-y-1.5',
    avatar: '',
    meta: 'flex items-center gap-2 mb-2',
    date: 'text-sm',
    badge: ''
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'lg:grid lg:grid-cols-2 lg:items-center gap-x-8',
        body: 'justify-center p-4 sm:p-6 lg:px-0'
      },
      vertical: {
        root: 'flex flex-col',
        body: 'p-4 sm:p-6'
      }
    },
    variant: {
      outline: {
        root: 'bg-default ring ring-default',
        date: 'text-toned',
        description: 'text-muted'
      },
      soft: {
        root: 'bg-elevated/50',
        date: 'text-muted',
        description: 'text-toned'
      },
      subtle: {
        root: 'bg-elevated/50 ring ring-default',
        date: 'text-muted',
        description: 'text-toned'
      },
      ghost: {
        date: 'text-toned',
        description: 'text-muted',
        header: 'shadow-lg rounded-lg'
      },
      naked: {
        root: 'p-0 sm:p-0',
        date: 'text-toned',
        description: 'text-muted',
        header: 'shadow-lg rounded-lg'
      }
    },
    to: {
      true: {
        root: [options.theme.transitions && 'transition'],
        image: 'transform transition-transform duration-200 group-hover/blog-post:scale-110',
        avatar: 'transform transition-transform duration-200 hover:scale-115'
      }
    },
    image: {
      true: ''
    }
  },
  compoundVariants: [{
    variant: 'outline',
    to: true,
    class: {
      root: 'hover:bg-elevated/50'
    }
  }, {
    variant: 'soft',
    to: true,
    class: {
      root: 'hover:bg-elevated'
    }
  }, {
    variant: 'subtle',
    to: true,
    class: {
      root: 'hover:bg-elevated hover:ring-accented'
    }
  }, {
    variant: 'ghost',
    to: true,
    class: {
      root: 'hover:bg-elevated/50',
      header: ['group-hover/blog-post:shadow-none', options.theme.transitions && 'transition-all']
    }
  }, {
    variant: 'ghost',
    to: true,
    orientation: 'vertical',
    class: {
      header: 'group-hover/blog-post:rounded-b-none'
    }
  }, {
    variant: 'ghost',
    to: true,
    orientation: 'horizontal',
    class: {
      header: 'group-hover/blog-post:rounded-r-none'
    }
  }, {
    orientation: 'vertical',
    image: false,
    variant: 'naked',
    class: {
      body: 'p-0 sm:p-0'
    }
  }],
  defaultVariants: {
    variant: 'outline'
  }
})

const blogPosts = {
  base: 'flex flex-col gap-8 lg:gap-y-16',
  variants: {
    orientation: {
      horizontal: 'sm:grid sm:grid-cols-2 lg:grid-cols-3',
      vertical: ''
    }
  }
}

const chatMessage = options => ({
  slots: {
    root: 'group/message relative w-full',
    container: 'relative flex items-start group-data-[role=user]/message:max-w-[75%]',
    leading: 'inline-flex items-center justify-center min-h-6',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    content: 'relative text-pretty',
    actions: ['opacity-0 group-hover/message:opacity-100 absolute bottom-0 flex items-center', options.theme.transitions && 'transition-opacity']
  },
  variants: {
    variant: {
      solid: {
        content: 'bg-inverted text-inverted'
      },
      outline: {
        content: 'bg-default ring ring-default'
      },
      soft: {
        content: 'bg-elevated/50'
      },
      subtle: {
        content: 'bg-elevated/50 ring ring-default'
      },
      naked: {
        content: ''
      }
    },
    side: {
      left: {
        container: 'rtl:justify-end'
      },
      right: {
        container: 'ltr:justify-end ms-auto'
      }
    },
    leading: {
      true: ''
    },
    actions: {
      true: ''
    },
    compact: {
      true: {
        root: 'scroll-mt-3',
        container: 'gap-1.5 pb-3',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs'
      },
      false: {
        root: 'scroll-mt-4 sm:scroll-mt-6',
        container: 'gap-3 pb-8',
        leadingIcon: 'size-8',
        leadingAvatarSize: 'md'
      }
    }
  },
  compoundVariants: [{
    compact: true,
    actions: true,
    class: {
      container: 'pb-8'
    }
  }, {
    leading: true,
    compact: false,
    side: 'left',
    class: {
      actions: 'left-11'
    }
  }, {
    leading: true,
    compact: true,
    side: 'left',
    class: {
      actions: 'left-6.5'
    }
  }, {
    variant: ['solid', 'outline', 'soft', 'subtle'],
    compact: false,
    class: {
      content: 'px-4 py-3 rounded-lg min-h-12',
      leading: 'mt-2'
    }
  }, {
    variant: ['solid', 'outline', 'soft', 'subtle'],
    compact: true,
    class: {
      content: 'px-2 py-1 rounded-lg min-h-8',
      leading: 'mt-1'
    }
  }],
  defaultVariants: {
    variant: 'naked'
  }
})

const chatMessages = {
  slots: {
    root: 'w-full flex flex-col gap-1 flex-1 px-2.5 [&>article]:last-of-type:min-h-(--last-message-height)',
    indicator: 'h-6 flex items-center gap-1 py-3 *:size-2 *:rounded-full *:bg-elevated [&>*:nth-child(1)]:animate-[bounce_1s_infinite] [&>*:nth-child(2)]:animate-[bounce_1s_0.15s_infinite] [&>*:nth-child(3)]:animate-[bounce_1s_0.3s_infinite]',
    viewport: 'absolute inset-x-0 top-[86%] data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
    autoScroll: 'rounded-full absolute right-1/2 translate-x-1/2 bottom-0'
  },
  variants: {
    compact: {
      true: '',
      false: ''
    }
  }
}

const chatPalette = {
  slots: {
    root: 'relative flex-1 flex flex-col min-h-0 min-w-0',
    prompt: 'px-0 rounded-t-none border-t border-default',
    close: '',
    content: 'overflow-y-auto flex-1 flex flex-col py-3'
  }
}

const chatPrompt = {
  slots: {
    root: 'relative flex flex-col items-stretch gap-2 px-2.5 py-2 w-full rounded-lg backdrop-blur',
    header: 'flex items-center gap-1.5',
    body: 'items-start',
    footer: 'flex items-center justify-between gap-1.5',
    base: 'text-base/5'
  },
  variants: {
    variant: {
      outline: {
        root: 'bg-default/75 ring ring-default'
      },
      soft: {
        root: 'bg-elevated/50'
      },
      subtle: {
        root: 'bg-elevated/50 ring ring-default'
      },
      naked: {
        root: ''
      }
    }
  },
  defaultVariants: {
    variant: 'outline'
  }
}

const chatPromptSubmit = {
  slots: {
    base: ''
  }
}

const dashboardGroup = {
  base: 'fixed inset-0 flex overflow-hidden'
}

const dashboardNavbar = {
  slots: {
    root: 'h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5',
    left: 'flex items-center gap-1.5 min-w-0',
    icon: 'shrink-0 size-5 self-center me-1.5',
    title: 'flex items-center gap-1.5 font-semibold text-highlighted truncate',
    center: 'hidden lg:flex',
    right: 'flex items-center shrink-0 gap-1.5',
    toggle: ''
  },
  variants: {
    toggleSide: {
      left: {
        toggle: ''
      },
      right: {
        toggle: ''
      }
    }
  }
}

const dashboardPanel = {
  slots: {
    root: 'relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default shrink-0',
    body: 'flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6',
    handle: ''
  },
  variants: {
    size: {
      true: {
        root: 'w-full lg:w-(--width)'
      },
      false: {
        root: 'flex-1'
      }
    }
  }
}

const dashboardResizeHandle = {
  base: 'hidden lg:block touch-none select-none cursor-ew-resize relative before:absolute before:inset-y-0 before:-left-1.5 before:-right-1.5'
}

const dashboardSearch = {
  slots: {
    modal: 'sm:max-w-3xl sm:h-[28rem]',
    input: '[&>input]:text-base/5'
  }
}

const dashboardSearchButton = {
  slots: {
    base: '',
    trailing: 'hidden lg:flex items-center gap-0.5 ms-auto'
  }
}

const dashboardSidebar = {
  slots: {
    root: 'relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0',
    header: 'h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4',
    body: 'flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2',
    footer: 'shrink-0 flex items-center gap-1.5 px-4 py-2',
    toggle: '',
    handle: '',
    content: 'lg:hidden',
    overlay: 'lg:hidden'
  },
  variants: {
    menu: {
      true: {
        header: 'sm:px-6',
        body: 'sm:px-6',
        footer: 'sm:px-6'
      }
    },
    side: {
      left: {
        root: 'border-r border-default'
      },
      right: {
        root: ''
      }
    },
    toggleSide: {
      left: {
        toggle: ''
      },
      right: {
        toggle: 'ms-auto'
      }
    }
  }
}

const dashboardSidebarCollapse = {
  base: 'hidden lg:flex',
  variants: {
    side: {
      left: '',
      right: ''
    }
  }
}

const dashboardSidebarToggle = {
  base: 'lg:hidden',
  variants: {
    side: {
      left: '',
      right: ''
    }
  }
}

const dashboardToolbar = {
  slots: {
    root: 'shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]',
    left: 'flex items-center gap-1.5',
    right: 'flex items-center gap-1.5'
  }
}

const error = {
  slots: {
    root: 'min-h-[calc(100vh-var(--ui-header-height))] flex flex-col items-center justify-center text-center',
    statusCode: 'text-base font-semibold text-primary',
    statusMessage: 'mt-2 text-4xl sm:text-5xl font-bold text-highlighted text-balance',
    message: 'mt-4 text-lg text-muted text-balance',
    links: 'mt-8 flex items-center justify-center gap-6'
  }
}

const footer = {
  slots: {
    root: '',
    top: 'py-8 lg:py-12',
    bottom: 'py-8 lg:py-12',
    container: 'py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3',
    left: 'flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1',
    center: 'mt-3 lg:mt-0 lg:order-2 flex items-center justify-center',
    right: 'lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3'
  }
}

const footerColumns = options => ({
  slots: {
    root: 'xl:grid xl:grid-cols-3 xl:gap-8',
    left: 'mb-10 xl:mb-0',
    center: 'flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-2',
    right: 'mt-10 xl:mt-0',
    label: 'text-sm font-semibold',
    list: 'mt-6 space-y-4',
    item: 'relative',
    link: 'group text-sm flex items-center gap-1.5 focus-visible:outline-primary',
    linkLeadingIcon: 'size-5 shrink-0',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'size-3 absolute top-0 text-dimmed inline-block'
  },
  variants: {
    active: {
      true: {
        link: 'text-primary font-medium'
      },
      false: {
        link: ['text-muted hover:text-default', options.theme.transitions && 'transition-colors']
      }
    }
  }
})

const header = {
  slots: {
    root: 'bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50',
    container: 'flex items-center justify-between gap-3 h-full',
    left: 'lg:flex-1 flex items-center gap-1.5',
    center: 'hidden lg:flex',
    right: 'flex items-center justify-end lg:flex-1 gap-1.5',
    title: 'shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5',
    toggle: 'lg:hidden',
    content: 'lg:hidden',
    overlay: 'lg:hidden',
    header: 'px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3',
    body: 'p-4 sm:p-6 overflow-y-auto'
  },
  variants: {
    toggleSide: {
      left: {
        toggle: '-ms-1.5'
      },
      right: {
        toggle: '-me-1.5'
      }
    }
  }
}

const main = {
  base: 'min-h-[calc(100vh-var(--ui-header-height))]'
}

const page = {
  slots: {
    root: 'flex flex-col lg:grid lg:grid-cols-10 lg:gap-10',
    left: 'lg:col-span-2',
    center: 'lg:col-span-8',
    right: 'lg:col-span-2 order-first lg:order-last'
  },
  variants: {
    left: {
      true: ''
    },
    right: {
      true: ''
    }
  },
  compoundVariants: [{
    left: true,
    right: true,
    class: {
      center: 'lg:col-span-6'
    }
  }, {
    left: false,
    right: false,
    class: {
      center: 'lg:col-span-10'
    }
  }]
}

const pageAccordion = {
  slots: {
    base: '',
    trigger: 'text-base',
    body: 'text-base text-muted'
  }
}

const pageAnchors = options => ({
  slots: {
    root: '',
    list: '',
    item: 'relative',
    link: 'group text-sm flex items-center gap-1.5 py-1 focus-visible:outline-primary',
    linkLeading: 'rounded-md p-1 inline-flex ring-inset ring',
    linkLeadingIcon: 'size-4 shrink-0',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'size-3 absolute top-0 text-dimmed'
  },
  variants: {
    active: {
      true: {
        link: 'text-primary font-semibold',
        linkLeading: 'bg-primary ring-primary text-inverted'
      },
      false: {
        link: ['text-muted hover:text-default font-medium', options.theme.transitions && 'transition-colors'],
        linkLeading: ['bg-elevated/50 ring-accented text-dimmed group-hover:bg-primary group-hover:ring-primary group-hover:text-inverted', options.theme.transitions && 'transition']
      }
    }
  }
})

const pageAside = {
  slots: {
    root: 'hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height) py-8 lg:ps-4 lg:-ms-4 lg:pe-6.5',
    container: 'relative',
    top: 'sticky -top-8 -mt-8 pointer-events-none z-[1]',
    topHeader: 'h-8 bg-default -mx-4 px-4',
    topBody: 'bg-default relative pointer-events-auto flex flex-col -mx-4 px-4',
    topFooter: 'h-8 bg-gradient-to-b from-default -mx-4 px-4'
  }
}

const pageBody = {
  base: 'mt-8 pb-24 space-y-12'
}

const pageCta = {
  slots: {
    root: 'relative isolate rounded-xl overflow-hidden',
    container: 'flex flex-col lg:grid px-6 py-12 sm:px-12 sm:py-24 lg:px-16 lg:py-24 gap-8 sm:gap-16',
    wrapper: '',
    title: 'text-3xl sm:text-4xl text-pretty tracking-tight font-bold text-highlighted',
    description: 'text-base sm:text-lg text-muted',
    links: 'mt-8 flex flex-wrap gap-x-6 gap-y-3'
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center',
        description: 'text-pretty'
      },
      vertical: {
        container: '',
        title: 'text-center',
        description: 'text-center text-balance',
        links: 'justify-center'
      }
    },
    reverse: {
      true: {
        wrapper: 'lg:order-last'
      }
    },
    variant: {
      solid: {
        root: 'bg-inverted text-inverted',
        title: 'text-inverted',
        description: 'text-dimmed'
      },
      outline: {
        root: 'bg-default ring ring-default',
        description: 'text-muted'
      },
      soft: {
        root: 'bg-elevated/50',
        description: 'text-toned'
      },
      subtle: {
        root: 'bg-elevated/50 ring ring-default',
        description: 'text-toned'
      },
      naked: {
        description: 'text-muted'
      }
    },
    title: {
      true: {
        description: 'mt-6'
      }
    }
  },
  defaultVariants: {
    variant: 'outline'
  }
}

const pageCard = options => ({
  slots: {
    root: 'relative flex rounded-lg',
    spotlight: 'absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90',
    container: 'relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 p-4 sm:p-6',
    wrapper: 'flex flex-col flex-1 items-start',
    header: 'mb-4',
    body: 'flex-1',
    footer: 'pt-4 mt-auto',
    leading: 'inline-flex items-center mb-2.5',
    leadingIcon: 'size-5 shrink-0 text-primary',
    title: 'text-base text-pretty font-semibold text-highlighted',
    description: 'text-[15px] text-pretty'
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center'
      },
      vertical: {
        container: ''
      }
    },
    reverse: {
      true: {
        wrapper: 'lg:order-last'
      }
    },
    variant: {
      solid: {
        root: 'bg-inverted text-inverted',
        title: 'text-inverted',
        description: 'text-dimmed'
      },
      outline: {
        root: 'bg-default ring ring-default',
        description: 'text-muted'
      },
      soft: {
        root: 'bg-elevated/50',
        description: 'text-toned'
      },
      subtle: {
        root: 'bg-elevated/50 ring ring-default',
        description: 'text-toned'
      },
      ghost: {
        description: 'text-muted'
      },
      naked: {
        container: 'p-0 sm:p-0',
        description: 'text-muted'
      }
    },
    to: {
      true: {
        root: [options.theme.transitions && 'transition']
      }
    },
    title: {
      true: {
        description: 'mt-1'
      }
    },
    highlight: {
      true: {
        root: 'ring-2'
      }
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, ''])),
      neutral: ''
    },
    spotlight: {
      true: {
        root: '[--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)]'
      }
    },
    spotlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, ''])),
      neutral: ''
    }
  },
  compoundVariants: [{
    variant: 'solid',
    to: true,
    class: {
      root: 'hover:bg-inverted/90'
    }
  }, {
    variant: 'outline',
    to: true,
    class: {
      root: 'hover:bg-elevated/50'
    }
  }, {
    variant: 'soft',
    to: true,
    class: {
      root: 'hover:bg-elevated'
    }
  }, {
    variant: 'subtle',
    to: true,
    class: {
      root: 'hover:bg-elevated'
    }
  }, {
    variant: 'subtle',
    to: true,
    highlight: false,
    class: {
      root: 'hover:ring-accented'
    }
  }, {
    variant: 'ghost',
    to: true,
    class: {
      root: 'hover:bg-elevated/50'
    }
  }, ...(options.theme.colors || []).map(highlightColor => ({
    highlightColor,
    highlight: true,
    class: {
      root: `ring-${highlightColor}`
    }
  })), {
    highlightColor: 'neutral',
    highlight: true,
    class: {
      root: 'ring-inverted'
    }
  }, ...(options.theme.colors || []).map(spotlightColor => ({
    spotlightColor,
    spotlight: true,
    class: {
      root: `[--spotlight-color:var(--ui-${spotlightColor})]`
    }
  })), {
    spotlightColor: 'neutral',
    spotlight: true,
    class: {
      root: '[--spotlight-color:var(--ui-bg-inverted)]'
    }
  }],
  defaultVariants: {
    variant: 'outline',
    highlightColor: 'primary',
    spotlightColor: 'primary'
  }
})

const pageColumns = {
  base: 'relative column-1 md:columns-2 lg:columns-3 gap-8 space-y-8 *:break-inside-avoid-column *:will-change-transform'
}

const pageFeature = {
  slots: {
    root: 'relative',
    wrapper: '',
    leading: 'inline-flex items-center justify-center',
    leadingIcon: 'size-5 shrink-0 text-primary',
    title: 'text-base text-pretty font-semibold text-highlighted',
    description: 'text-[15px] text-pretty text-muted'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex items-start gap-2.5',
        leading: 'p-0.5'
      },
      vertical: {
        leading: 'mb-2.5'
      }
    },
    title: {
      true: {
        description: 'mt-1'
      }
    }
  }
}

const pageGrid = {
  base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
}

const pageHeader = {
  slots: {
    root: 'relative border-b border-default py-8',
    container: '',
    wrapper: 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4',
    headline: 'mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5',
    title: 'text-3xl sm:text-4xl text-pretty font-bold text-highlighted',
    description: 'text-lg text-pretty text-muted',
    links: 'flex flex-wrap items-center gap-1.5'
  },
  variants: {
    title: {
      true: {
        description: 'mt-4'
      }
    }
  }
}

const pageHero = {
  slots: {
    root: 'relative isolate',
    container: 'flex flex-col lg:grid py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24',
    wrapper: '',
    headline: 'mb-4',
    title: 'text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted',
    description: 'text-lg sm:text-xl/8 text-muted',
    links: 'mt-10 flex flex-wrap gap-x-6 gap-y-3'
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center',
        description: 'text-pretty'
      },
      vertical: {
        container: '',
        headline: 'justify-center',
        wrapper: 'text-center',
        description: 'text-balance',
        links: 'justify-center'
      }
    },
    reverse: {
      true: {
        wrapper: 'order-last'
      }
    },
    headline: {
      true: {
        headline: 'font-semibold text-primary flex items-center gap-1.5'
      }
    },
    title: {
      true: {
        description: 'mt-6'
      }
    }
  }
}

const pageLinks = options => ({
  slots: {
    root: 'flex flex-col gap-3',
    title: 'text-sm font-semibold flex items-center gap-1.5',
    list: 'flex flex-col gap-2',
    item: 'relative',
    link: 'group text-sm flex items-center gap-1.5 focus-visible:outline-primary',
    linkLeadingIcon: 'size-5 shrink-0',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'size-3 absolute top-0 text-dimmed'
  },
  variants: {
    active: {
      true: {
        link: 'text-primary font-medium'
      },
      false: {
        link: ['text-muted hover:text-default', options.theme.transitions && 'transition-colors']
      }
    }
  }
})

const pageList = {
  base: 'relative flex flex-col',
  variants: {
    divide: {
      true: '*:not-last:after:absolute *:not-last:after:inset-x-1 *:not-last:after:bottom-0 *:not-last:after:bg-border *:not-last:after:h-px'
    }
  }
}

const pageLogos = {
  slots: {
    root: 'relative overflow-hidden',
    title: 'text-lg text-center font-semibold text-highlighted',
    logos: 'mt-10',
    logo: 'size-10 shrink-0'
  },
  variants: {
    marquee: {
      false: {
        logos: 'flex items-center shrink-0 justify-around gap-(--gap) [--gap:--spacing(16)]'
      }
    }
  }
}

const pageMarquee = {
  slots: {
    root: 'group relative flex items-center overflow-hidden gap-(--gap) [--gap:--spacing(16)] [--duration:20s]',
    content: 'flex items-center shrink-0 justify-around gap-(--gap) min-w-max'
  },
  variants: {
    orientation: {
      horizontal: {
        content: 'w-full'
      },
      vertical: {
        content: 'h-full'
      }
    },
    pauseOnHover: {
      true: {
        content: 'group-hover:[animation-play-state:paused]'
      }
    },
    reverse: {
      true: {
        content: '[animation-direction:reverse]'
      }
    },
    overlay: {
      true: {
        root: 'before:absolute before:pointer-events-none before:content-[""] before:z-2 before:from-default before:to-transparent after:absolute after:pointer-events-none after:content-[""] after:z-2 after:from-default after:to-transparent'
      }
    }
  },
  compoundVariants: [{
    orientation: 'horizontal',
    class: {
      root: 'flex-row',
      content: 'flex-row animate-[marquee_var(--duration)_linear_infinite] rtl:animate-[marquee-rtl_var(--duration)_linear_infinite] backface-hidden'
    }
  }, {
    orientation: 'horizontal',
    overlay: true,
    class: {
      root: 'before:inset-y-0 before:left-0 before:h-full before:w-1/3 before:bg-gradient-to-r after:inset-y-0 after:right-0 after:h-full after:w-1/3 after:bg-gradient-to-l backface-hidden'
    }
  }, {
    orientation: 'vertical',
    class: {
      root: 'flex-col',
      content: 'flex-col animate-[marquee-vertical_var(--duration)_linear_infinite] rtl:animate-[marquee-vertical-rtl_var(--duration)_linear_infinite] h-[fit-content] backface-hidden'
    }
  }, {
    orientation: 'vertical',
    overlay: true,
    class: {
      root: 'before:inset-x-0 before:top-0 before:w-full before:h-1/3 before:bg-gradient-to-b after:inset-x-0 after:bottom-0 after:w-full after:h-1/3 after:bg-gradient-to-t backface-hidden'
    }
  }]
}

const pageSection = {
  slots: {
    root: 'relative isolate',
    container: 'flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16',
    wrapper: '',
    headline: 'mb-3',
    leading: 'flex items-center mb-6',
    leadingIcon: 'size-10 shrink-0 text-primary',
    title: 'text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted',
    description: 'text-base sm:text-lg text-muted',
    links: 'mt-8 flex flex-wrap gap-x-6 gap-y-3',
    features: 'mt-8 grid'
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center',
        description: 'text-pretty',
        features: 'gap-4'
      },
      vertical: {
        container: '',
        headline: 'justify-center',
        leading: 'justify-center',
        title: 'text-center',
        description: 'text-center text-balance',
        links: 'justify-center',
        features: 'sm:grid-cols-2 lg:grid-cols-3 gap-8'
      }
    },
    reverse: {
      true: {
        wrapper: 'lg:order-last'
      }
    },
    headline: {
      true: {
        headline: 'font-semibold text-primary flex items-center gap-1.5'
      }
    },
    title: {
      true: {
        description: 'mt-6'
      }
    },
    description: {
      true: ''
    },
    features: {
      true: ''
    }
  },
  compoundVariants: [{
    orientation: 'vertical',
    title: true,
    class: {
      features: 'mt-16'
    }
  }, {
    orientation: 'vertical',
    description: true,
    class: {
      features: 'mt-16'
    }
  }, {
    orientation: 'vertical',
    features: true,
    class: {
      links: 'mt-16'
    }
  }]
}

const pricingPlan = {
  slots: {
    root: 'relative grid rounded-lg p-6 lg:p-8 xl:p-10 gap-6',
    header: '',
    body: 'flex flex-col min-w-0',
    footer: 'flex flex-col gap-6 items-center',
    titleWrapper: 'flex items-center gap-3',
    title: 'text-highlighted text-2xl sm:text-3xl text-pretty font-semibold',
    description: 'text-muted text-base text-pretty mt-2',
    priceWrapper: 'flex items-center gap-1',
    price: 'text-highlighted text-3xl sm:text-4xl font-semibold',
    discount: 'text-muted line-through text-xl sm:text-2xl',
    billing: 'flex flex-col justify-between min-w-0',
    billingPeriod: 'text-toned truncate text-xs font-medium',
    billingCycle: 'text-muted truncate text-xs font-medium',
    features: 'flex flex-col gap-3 flex-1 mt-6 grow-0',
    feature: 'flex items-center gap-2 min-w-0',
    featureIcon: 'size-5 shrink-0 text-primary',
    featureTitle: 'text-muted text-sm truncate',
    badge: '',
    button: '',
    tagline: 'text-base font-semibold text-default',
    terms: 'text-xs/5 text-muted text-center text-balance'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'grid-cols-1 lg:grid-cols-3 justify-between divide-y lg:divide-y-0 lg:divide-x divide-default',
        body: 'lg:col-span-2 pb-6 lg:pb-0 lg:pr-6 justify-center',
        footer: 'lg:justify-center lg:items-center lg:p-6 lg:max-w-xs lg:w-full lg:mx-auto',
        features: 'lg:grid lg:grid-cols-2 lg:mt-12'
      },
      vertical: {
        footer: 'justify-end',
        priceWrapper: 'mt-6'
      }
    },
    variant: {
      solid: {
        root: 'bg-inverted',
        title: 'text-inverted',
        description: 'text-dimmed',
        price: 'text-inverted',
        discount: 'text-dimmed',
        billingCycle: 'text-dimmed',
        billingPeriod: 'text-dimmed',
        featureTitle: 'text-dimmed'
      },
      outline: {
        root: 'bg-default ring ring-default'
      },
      soft: {
        root: 'bg-elevated/50'
      },
      subtle: {
        root: 'bg-elevated/50 ring ring-default'
      }
    },
    highlight: {
      true: {
        root: 'ring-2 ring-inset ring-primary'
      }
    },
    scale: {
      true: {
        root: 'lg:scale-[1.1] lg:z-[1]'
      }
    }
  },
  compoundVariants: [{
    orientation: 'horizontal',
    variant: 'soft',
    class: {
      root: 'divide-accented'
    }
  }, {
    orientation: 'horizontal',
    variant: 'subtle',
    class: {
      root: 'divide-accented'
    }
  }],
  defaultVariants: {
    variant: 'outline'
  }
}

const pricingPlans = {
  base: 'flex flex-col gap-y-8',
  variants: {
    orientation: {
      horizontal: 'lg:grid lg:grid-cols-[repeat(var(--count),minmax(0,1fr))]',
      vertical: ''
    },
    compact: {
      false: 'gap-x-8'
    },
    scale: {
      true: ''
    }
  },
  compoundVariants: [{
    compact: false,
    scale: true,
    class: 'lg:gap-x-13'
  }]
}

const pricingTable = {
  slots: {
    root: 'w-full relative',
    table: 'w-full table-fixed border-separate border-spacing-x-0 hidden md:table',
    list: 'md:hidden flex flex-col gap-6 w-full',
    item: 'p-6 flex flex-col border border-default rounded-lg',
    caption: 'sr-only',
    thead: '',
    tbody: '',
    tr: '',
    th: 'py-4 font-normal text-left border-b border-default',
    td: 'px-6 py-4 text-center border-b border-default',
    tier: 'p-6 text-left font-normal',
    tierTitleWrapper: 'flex items-center gap-3',
    tierTitle: 'text-lg font-semibold text-highlighted',
    tierDescription: 'text-sm font-normal text-muted mt-1',
    tierBadge: 'truncate',
    tierPriceWrapper: 'flex items-center gap-1 mt-4',
    tierPrice: 'text-highlighted text-3xl sm:text-4xl font-semibold',
    tierDiscount: 'text-muted line-through text-xl sm:text-2xl',
    tierBilling: 'flex flex-col justify-between min-w-0',
    tierBillingPeriod: 'text-toned truncate text-xs font-medium',
    tierBillingCycle: 'text-muted truncate text-xs font-medium',
    tierButton: 'mt-6',
    tierFeatureIcon: 'size-5 shrink-0',
    section: 'mt-6 flex flex-col gap-2',
    sectionTitle: 'font-semibold text-sm text-highlighted',
    feature: 'flex items-center justify-between gap-1',
    featureTitle: 'text-sm text-default',
    featureValue: 'text-sm text-muted flex justify-center min-w-5'
  },
  variants: {
    section: {
      true: {
        tr: '*:pt-8'
      }
    },
    active: {
      true: {
        tierFeatureIcon: 'text-primary'
      }
    },
    highlight: {
      true: {
        tier: 'bg-elevated/50 border-x border-t border-default rounded-t-lg',
        td: 'bg-elevated/50 border-x border-default',
        item: 'bg-elevated/50'
      }
    }
  }
}

const user = options => ({
  slots: {
    root: 'relative group/user',
    wrapper: '',
    name: 'font-medium',
    description: 'text-muted',
    avatar: 'shrink-0'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex items-center'
      },
      vertical: {
        root: 'flex flex-col'
      }
    },
    to: {
      true: {
        name: ['text-default peer-hover:text-highlighted', options.theme.transitions && 'transition-colors'],
        description: ['peer-hover:text-toned', options.theme.transitions && 'transition-colors'],
        avatar: 'transform transition-transform duration-200 group-hover/user:scale-115'
      },
      false: {
        name: 'text-highlighted',
        description: ''
      }
    },
    size: {
      '3xs': {
        root: 'gap-1',
        wrapper: 'flex items-center gap-1',
        name: 'text-xs',
        description: 'text-xs'
      },
      '2xs': {
        root: 'gap-1.5',
        wrapper: 'flex items-center gap-1.5',
        name: 'text-xs',
        description: 'text-xs'
      },
      'xs': {
        root: 'gap-1.5',
        wrapper: 'flex items-center gap-1.5',
        name: 'text-xs',
        description: 'text-xs'
      },
      'sm': {
        root: 'gap-2',
        name: 'text-xs',
        description: 'text-xs'
      },
      'md': {
        root: 'gap-2',
        name: 'text-sm',
        description: 'text-xs'
      },
      'lg': {
        root: 'gap-2.5',
        name: 'text-sm',
        description: 'text-sm'
      },
      'xl': {
        root: 'gap-2.5',
        name: 'text-base',
        description: 'text-sm'
      },
      '2xl': {
        root: 'gap-3',
        name: 'text-base',
        description: 'text-base'
      },
      '3xl': {
        root: 'gap-3',
        name: 'text-lg',
        description: 'text-base'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

const theme$1 = {
  __proto__: null,
  authForm: authForm,
  banner: banner,
  blogPost: blogPost,
  blogPosts: blogPosts,
  chatMessage: chatMessage,
  chatMessages: chatMessages,
  chatPalette: chatPalette,
  chatPrompt: chatPrompt,
  chatPromptSubmit: chatPromptSubmit,
  dashboardGroup: dashboardGroup,
  dashboardNavbar: dashboardNavbar,
  dashboardPanel: dashboardPanel,
  dashboardResizeHandle: dashboardResizeHandle,
  dashboardSearch: dashboardSearch,
  dashboardSearchButton: dashboardSearchButton,
  dashboardSidebar: dashboardSidebar,
  dashboardSidebarCollapse: dashboardSidebarCollapse,
  dashboardSidebarToggle: dashboardSidebarToggle,
  dashboardToolbar: dashboardToolbar,
  error: error,
  footer: footer,
  footerColumns: footerColumns,
  header: header,
  main: main,
  page: page,
  pageAccordion: pageAccordion,
  pageAnchors: pageAnchors,
  pageAside: pageAside,
  pageBody: pageBody,
  pageCTA: pageCta,
  pageCard: pageCard,
  pageColumns: pageColumns,
  pageFeature: pageFeature,
  pageGrid: pageGrid,
  pageHeader: pageHeader,
  pageHero: pageHero,
  pageLinks: pageLinks,
  pageList: pageList,
  pageLogos: pageLogos,
  pageMarquee: pageMarquee,
  pageSection: pageSection,
  pricingPlan: pricingPlan,
  pricingPlans: pricingPlans,
  pricingTable: pricingTable,
  user: user
}

const a = options => ({
  base: ['text-primary border-b border-transparent hover:border-primary font-medium focus-visible:outline-primary [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary', options.theme.transitions && 'transition-colors [&>code]:transition-colors']
})

const accordion = {
  slots: {
    root: 'my-5',
    trigger: 'text-base'
  }
}

const accordionItem = {
  base: 'leading-7 pb-3.5 text-muted'
}

const badge = {
  base: 'rounded-full'
}

const blockquote = {
  base: 'border-s-4 border-accented ps-4 italic'
}

const callout = options => ({
  slots: {
    base: ['group relative block px-4 py-3 rounded-md text-sm/6 my-5 last:mb-0 [&_code]:text-xs/5 [&_code]:bg-default [&_pre]:bg-default [&>div]:my-2.5 [&_ul]:my-2.5 [&_ol]:my-2.5 [&>*]:last:!mb-0 [&_ul]:ps-4.5 [&_ol]:ps-4.5 [&_li]:my-0', options.theme.transitions && 'transition-colors'],
    icon: ['size-4 shrink-0 align-sub me-1.5', options.theme.transitions && 'transition-colors'],
    externalIcon: ['size-4 align-top absolute right-2 top-2 pointer-events-none', options.theme.transitions && 'transition-colors']
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, {
        base: `border border-${color}/25 bg-${color}/10 text-${color}-600 dark:text-${color}-300 [&_a]:text-${color} [&_a]:hover:border-${color} [&_code]:text-${color}-600 dark:[&_code]:text-${color}-300 [&_code]:border-${color}/25 [&_a]:hover:[&>code]:border-${color} [&_a]:hover:[&>code]:text-${color} [&>ul]:marker:text-${color}/50`,
        icon: `text-${color}`,
        externalIcon: `text-${color}-600 dark:text-${color}-300`
      }])),
      neutral: {
        base: 'border border-muted bg-muted text-default',
        icon: 'text-highlighted',
        externalIcon: 'text-dimmed'
      }
    },
    to: {
      true: 'border-dashed'
    }
  },
  compoundVariants: [...(options.theme.colors || []).map(color => ({
    color,
    to: true,
    class: {
      base: `hover:border-${color}`,
      externalIcon: `group-hover:text-${color}`
    }
  })), {
    color: 'neutral',
    to: true,
    class: {
      base: 'hover:border-inverted',
      externalIcon: 'group-hover:text-highlighted'
    }
  }],
  defaultVariants: {
    color: 'neutral'
  }
})

const card = options => ({
  slots: {
    base: ['group relative block p-4 sm:p-6 border border-default rounded-md bg-default', options.theme.transitions && 'transition-colors'],
    icon: 'size-6 mb-2 block',
    title: 'text-highlighted font-semibold',
    description: 'text-[15px] text-muted',
    externalIcon: ['size-4 align-top absolute right-2 top-2 text-dimmed pointer-events-none', options.theme.transitions && 'transition-colors']
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, {
        icon: `text-${color}`
      }])),
      neutral: {
        icon: 'text-highlighted'
      }
    },
    to: {
      true: ''
    },
    title: {
      true: {
        description: 'mt-1'
      }
    }
  },
  compoundVariants: [...(options.theme.colors || []).map(color => ({
    color,
    to: true,
    class: {
      base: `hover:bg-${color}/10 hover:border-${color}`,
      externalIcon: `group-hover:text-${color}`
    }
  })), {
    color: 'neutral',
    to: true,
    class: {
      base: 'hover:bg-elevated/50 hover:border-inverted',
      externalIcon: 'group-hover:text-highlighted'
    }
  }],
  defaultVariants: {
    color: 'primary'
  }
})

const cardGroup = {
  base: 'grid grid-cols-1 sm:grid-cols-2 gap-5'
}

const code = options => ({
  base: 'px-1.5 py-0.5 text-sm font-mono font-medium rounded-md inline-block',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, `border border-${color}/25 bg-${color}/10 text-${color}`])),
      neutral: 'border border-muted text-highlighted bg-muted'
    }
  },
  defaultVariants: {
    color: 'neutral'
  }
})

const codeCollapse = {
  slots: {
    root: 'relative [&_pre]:h-[200px]',
    footer: 'h-16 absolute inset-x-px bottom-px rounded-b-md flex items-center justify-center',
    trigger: 'group',
    triggerIcon: 'group-data-[state=open]:rotate-180'
  },
  variants: {
    open: {
      true: {
        root: '[&_pre]:h-auto [&_pre]:min-h-[200px] [&_pre]:max-h-[80vh] [&_pre]:pb-12'
      },
      false: {
        root: '[&_pre]:overflow-hidden',
        footer: 'bg-gradient-to-t from-muted'
      }
    }
  }
}

const codeGroup = options => ({
  slots: {
    root: 'relative group *:not-first:!my-0 *:not-first:!static my-5',
    list: 'relative flex items-center gap-1 border border-muted bg-default border-b-0 rounded-t-md overflow-x-auto p-2',
    indicator: 'absolute left-0 inset-y-2 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) transition-[translate,width] duration-200 bg-elevated rounded-md shadow-xs',
    trigger: ['relative inline-flex items-center gap-1.5 text-default data-[state=active]:text-highlighted hover:bg-elevated/50 px-2 py-1.5 text-sm rounded-md disabled:cursor-not-allowed disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary focus:outline-none', options.theme.transitions && 'transition-colors'],
    triggerIcon: 'size-4 shrink-0',
    triggerLabel: 'truncate'
  }
})

const codeIcon = {
  'package.json': 'i-vscode-icons-file-type-node',
  'tsconfig.json': 'i-vscode-icons-file-type-tsconfig',
  '.npmrc': 'i-vscode-icons-file-type-npm',
  '.editorconfig': 'i-vscode-icons-file-type-editorconfig',
  '.eslintrc': 'i-vscode-icons-file-type-eslint',
  '.eslintrc.cjs': 'i-vscode-icons-file-type-eslint',
  '.eslintignore': 'i-vscode-icons-file-type-eslint',
  'eslint.config.js': 'i-vscode-icons-file-type-eslint',
  'eslint.config.mjs': 'i-vscode-icons-file-type-eslint',
  'eslint.config.cjs': 'i-vscode-icons-file-type-eslint',
  '.gitignore': 'i-vscode-icons-file-type-git',
  'yarn.lock': 'i-vscode-icons-file-type-yarn',
  '.env': 'i-vscode-icons-file-type-dotenv',
  '.env.example': 'i-vscode-icons-file-type-dotenv',
  '.vscode/settings.json': 'i-vscode-icons-file-type-vscode',
  'nuxt': 'i-vscode-icons-file-type-nuxt',
  '.nuxtrc': 'i-vscode-icons-file-type-nuxt',
  '.nuxtignore': 'i-vscode-icons-file-type-nuxt',
  'nuxt.config.js': 'i-vscode-icons-file-type-nuxt',
  'nuxt.config.ts': 'i-vscode-icons-file-type-nuxt',
  'nuxt.schema.ts': 'i-vscode-icons-file-type-nuxt',
  'tailwind.config.js': 'i-vscode-icons-file-type-tailwind',
  'tailwind.config.ts': 'i-vscode-icons-file-type-tailwind',
  'vue': 'i-vscode-icons-file-type-vue',
  'ts': 'i-vscode-icons-file-type-typescript',
  'tsx': 'i-vscode-icons-file-type-typescript',
  'mjs': 'i-vscode-icons-file-type-js',
  'cjs': 'i-vscode-icons-file-type-js',
  'js': 'i-vscode-icons-file-type-js',
  'jsx': 'i-vscode-icons-file-type-js',
  'md': 'i-vscode-icons-file-type-markdown',
  'py': 'i-vscode-icons-file-type-python',
  'cs': 'i-vscode-icons-file-type-csharp',
  'asm': 'i-vscode-icons-file-type-assembly',
  'f': 'i-vscode-icons-file-type-fortran',
  'hs': 'i-vscode-icons-file-type-haskell',
  'fs': 'i-vscode-icons-file-type-fsharp',
  'kt': 'i-vscode-icons-file-type-kotlin',
  'rs': 'i-vscode-icons-file-type-rust',
  'rb': 'i-vscode-icons-file-type-ruby',
  'lsp': 'i-vscode-icons-file-type-lisp',
  'ps1': 'i-vscode-icons-file-type-powershell',
  'psd1': 'i-vscode-icons-file-type-powershell',
  'psm1': 'i-vscode-icons-file-type-powershell',
  'go': 'i-vscode-icons-file-type-go',
  'gleam': 'i-vscode-icons-file-type-gleam',
  'bicep': 'i-vscode-icons-file-type-bicep',
  'bicepparam': 'i-vscode-icons-file-type-bicep',
  'exs': 'i-vscode-icons-file-type-elixir',
  'erl': 'i-vscode-icons-file-type-erlang',
  'sbt': 'i-vscode-icons-file-type-scala',
  'h': 'i-vscode-icons-file-type-cppheader',
  'ino': 'i-vscode-icons-file-type-arduino',
  'pl': 'i-vscode-icons-file-type-perl',
  'jl': 'i-vscode-icons-file-type-julia',
  'dart': 'i-vscode-icons-file-type-dartlang',
  'ico': 'i-vscode-icons-file-type-favicon',
  'npm': 'i-vscode-icons-file-type-npm',
  'pnpm': 'i-vscode-icons-file-type-pnpm',
  'npx': 'i-vscode-icons-file-type-npm',
  'yarn': 'i-vscode-icons-file-type-yarn',
  'bun': 'i-vscode-icons-file-type-bun',
  'yml': 'i-vscode-icons-file-type-yaml',
  'terminal': 'i-lucide-terminal'
}

const codePreview = {
  slots: {
    root: 'my-5',
    preview: 'flex justify-center border border-muted relative p-4 rounded-md',
    code: '[&>div>pre]:rounded-t-none [&>div]:my-0'
  },
  variants: {
    code: {
      true: {
        preview: 'border-b-0 rounded-b-none'
      }
    }
  }
}

const codeTree = options => ({
  slots: {
    root: 'relative lg:h-[450px] my-5 grid lg:grid-cols-3 border border-muted rounded-md',
    list: 'isolate relative p-2 border-b lg:border-b-0 lg:border-e border-muted overflow-y-auto',
    item: '',
    listWithChildren: 'ms-4.5 border-s border-default',
    itemWithChildren: 'ps-1.5 -ms-px',
    link: 'relative group peer w-full px-2.5 py-1.5 before:inset-y-px before:inset-x-0 flex items-center gap-1.5 text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    linkLeadingIcon: 'size-4 shrink-0',
    linkLabel: 'truncate',
    linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    linkTrailingIcon: 'size-5 transform transition-transform duration-200 shrink-0 group-data-expanded:rotate-180',
    content: 'overflow-hidden lg:col-span-2 flex flex-col [&>div]:my-0 [&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div>div]:border-0 [&>div>pre]:border-b-0 [&>div>pre]:border-s-0 [&>div>pre]:border-e-0 [&>div>pre]:rounded-l-none [&>div>pre]:flex-1 [&>div]:overflow-y-auto'
  },
  variants: {
    active: {
      true: {
        link: 'text-highlighted before:bg-elevated'
      },
      false: {
        link: ['hover:text-highlighted hover:before:bg-elevated/50', options.theme.transitions && 'transition-colors before:transition-colors']
      }
    }
  }
})

const collapsible = options => ({
  slots: {
    base: '',
    trigger: ['group relative rounded-xs inline-flex items-center gap-1.5 text-muted hover:text-default text-sm focus-visible:ring-2 focus-visible:ring-primary focus:outline-none', options.theme.transitions && 'transition-colors'],
    triggerIcon: 'size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    triggerLabel: 'truncate'
  }
})

const em = {
  base: ''
}

const field = {
  slots: {
    root: 'my-5',
    container: 'flex items-center gap-3 font-mono text-sm',
    name: 'font-semibold text-primary',
    wrapper: 'flex-1 flex items-center gap-1.5 text-xs',
    required: 'rounded-sm bg-error/10 text-error px-1.5 py-0.5',
    type: 'rounded-sm bg-elevated text-toned px-1.5 py-0.5',
    description: 'mt-3 text-muted text-sm [&_code]:text-xs/4'
  }
}

const fieldGroup = {
  base: 'my-5 divide-y divide-default *:not-last:pb-5'
}

const h1 = {
  slots: {
    base: 'text-4xl text-highlighted font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)',
    link: 'inline-flex items-center gap-2'
  }
}

const h2 = options => ({
  slots: {
    base: ['relative text-2xl text-highlighted font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-xl/7 [&>a>code]:font-bold', options.theme.transitions && '[&>a>code]:transition-colors'],
    leading: ['absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:flex text-muted', options.theme.transitions && 'transition'],
    leadingIcon: 'size-4 shrink-0',
    link: 'group lg:ps-2 lg:-ms-2'
  }
})

const h3 = options => ({
  slots: {
    base: ['relative text-xl text-highlighted font-bold mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(32px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-lg/6 [&>a>code]:font-bold', options.theme.transitions && '[&>a>code]:transition-colors'],
    leading: ['absolute -ms-8 top-0.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:flex text-muted', options.theme.transitions && 'transition'],
    leadingIcon: 'size-4 shrink-0',
    link: 'group lg:ps-2 lg:-ms-2'
  }
})

const h4 = {
  slots: {
    base: 'text-lg text-highlighted font-bold mt-6 mb-2 scroll-mt-[calc(24px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(24px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary',
    link: ''
  }
}

const hr = {
  base: 'border-t border-default my-12'
}

const icon = {
  base: 'size-4 shrink-0 align-sub'
}

const img = {
  base: ''
}

const kbd = {
  base: 'align-text-top'
}

const li = {
  base: 'my-1.5 ps-1.5 leading-7 [&>ul]:my-0'
}

const ol = {
  base: 'list-decimal ps-6 my-5 marker:text-muted'
}

const p = {
  base: 'my-5 leading-7 text-pretty'
}

const pre = {
  slots: {
    root: 'relative my-5 group',
    header: 'flex items-center gap-1.5 border border-muted bg-default border-b-0 relative rounded-t-md px-4 py-3',
    filename: 'text-default text-sm/6',
    icon: 'size-4 shrink-0',
    copy: 'absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition',
    base: 'group font-mono text-sm/6 border border-muted bg-muted rounded-md px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none'
  },
  variants: {
    filename: {
      true: {
        root: '[&>pre]:rounded-t-none [&>pre]:my-0 my-5'
      }
    }
  }
}

const steps = {
  base: 'ms-4 border-s border-default ps-8 [counter-reset:step]',
  variants: {
    level: {
      2: '[&>h2]:[counter-increment:step] [&>h2]:relative [&>h2]:before:absolute [&>h2]:before:size-8 [&>h2]:before:bg-elevated [&>h2]:before:rounded-full [&>h2]:before:font-semibold [&>h2]:before:text-sm [&>h2]:before:tabular-nums [&>h2]:before:inline-flex [&>h2]:before:items-center [&>h2]:before:justify-center [&>h2]:before:ring-4 [&>h2]:before:ring-bg [&>h2]:before:-ms-[48.5px] [&>h2]:before:-mt-0 [&>h2]:before:content-[counter(step)] [&>h2>a>span]:hidden',
      3: '[&>h3]:[counter-increment:step] [&>h3]:relative [&>h3]:before:absolute [&>h3]:before:size-7 [&>h3]:before:inset-x-0.5 [&>h3]:before:bg-elevated [&>h3]:before:rounded-full [&>h3]:before:font-semibold [&>h3]:before:text-sm [&>h3]:before:tabular-nums [&>h3]:before:inline-flex [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:ring-4 [&>h3]:before:ring-bg [&>h3]:before:-ms-[48.5px] [&>h3]:before:content-[counter(step)] [&>h3>a>span]:hidden',
      4: '[&>h4]:[counter-increment:step] [&>h4]:relative [&>h4]:before:absolute [&>h4]:before:size-7 [&>h4]:before:inset-x-0.5 [&>h4]:before:bg-elevated [&>h4]:before:rounded-full [&>h4]:before:font-semibold [&>h4]:before:text-sm [&>h4]:before:tabular-nums [&>h4]:before:inline-flex [&>h4]:before:items-center [&>h4]:before:justify-center [&>h4]:before:ring-4 [&>h4]:before:ring-bg [&>h4]:before:-ms-[48.5px] [&>h4]:before:content-[counter(step)] [&>h4>a>span]:hidden'
    }
  },
  defaultVariants: {
    level: '3'
  }
}

const strong = {
  base: ''
}

const table = {
  slots: {
    root: 'relative my-5 overflow-x-auto',
    base: 'w-full border-separate border-spacing-0 rounded-md'
  }
}

const tabs = {
  slots: {
    root: 'my-5'
  }
}

const tabsItem = {
  base: ''
}

const tbody = {
  base: ''
}

const td = {
  base: 'py-3 px-4 text-sm text-left align-top border-e border-b first:border-s border-muted [&_code]:text-xs/5 [&_p]:my-0 [&_p]:leading-6 [&_ul]:my-0 [&_ol]:my-0 [&_ul]:ps-4.5 [&_ol]:ps-4.5 [&_li]:leading-6 [&_li]:my-0.5'
}

const th = {
  base: 'py-3 px-4 font-semibold text-sm text-left border-e border-b first:border-s border-t border-muted'
}

const thead = {
  base: 'bg-muted'
}

const tr = {
  base: '[&:first-child>th:first-child]:rounded-tl-md [&:first-child>th:last-child]:rounded-tr-md [&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-md'
}

const ul = {
  base: 'list-disc ps-6 my-5 marker:text-(--ui-border-accented)'
}

const themeProse = {
  __proto__: null,
  a: a,
  accordion: accordion,
  accordionItem: accordionItem,
  badge: badge,
  blockquote: blockquote,
  callout: callout,
  card: card,
  cardGroup: cardGroup,
  code: code,
  codeCollapse: codeCollapse,
  codeGroup: codeGroup,
  codeIcon: codeIcon,
  codePreview: codePreview,
  codeTree: codeTree,
  collapsible: collapsible,
  em: em,
  field: field,
  fieldGroup: fieldGroup,
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  hr: hr,
  icon: icon,
  img: img,
  kbd: kbd,
  li: li,
  ol: ol,
  p: p,
  pre: pre,
  steps: steps,
  strong: strong,
  table: table,
  tabs: tabs,
  tabsItem: tabsItem,
  tbody: tbody,
  td: td,
  th: th,
  thead: thead,
  tr: tr,
  ul: ul
}

const contentNavigation = options => ({
  slots: {
    root: '',
    content: 'data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none',
    list: 'isolate -mx-2.5 -mt-1.5',
    item: '',
    listWithChildren: 'ms-5 border-s border-default',
    itemWithChildren: 'flex flex-col data-[state=open]:mb-1.5',
    trigger: 'font-semibold',
    link: 'group relative w-full px-2.5 py-1.5 before:inset-y-px before:inset-x-0 flex items-center gap-1.5 text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    linkLeadingIcon: 'shrink-0 size-5',
    linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'size-5 transform transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180',
    linkTitle: 'truncate',
    linkTitleExternalIcon: 'size-3 align-top text-dimmed'
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, {
        trigger: `focus-visible:ring-${color}`,
        link: `focus-visible:before:ring-${color}`
      }])),
      neutral: {
        trigger: 'focus-visible:ring-inverted',
        link: 'focus-visible:before:ring-inverted'
      }
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, ''])),
      neutral: ''
    },
    variant: {
      pill: '',
      link: ''
    },
    active: {
      true: {
        link: 'font-medium'
      },
      false: {
        link: 'text-muted',
        linkLeadingIcon: 'text-dimmed'
      }
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-75'
      }
    },
    highlight: {
      true: {}
    },
    level: {
      true: {
        item: 'ps-1.5 -ms-px',
        itemWithChildren: 'ps-1.5 -ms-px'
      }
    }
  },
  compoundVariants: [{
    highlight: true,
    level: true,
    class: {
      link: ['after:absolute after:-left-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full', options.theme.transitions && 'after:transition-colors']
    }
  }, {
    disabled: false,
    active: false,
    variant: 'pill',
    class: {
      link: ['hover:text-highlighted hover:before:bg-elevated/50 data-[state=open]:text-highlighted', options.theme.transitions && 'transition-colors before:transition-colors'],
      linkLeadingIcon: ['group-hover:text-default group-data-[state=open]:text-default', options.theme.transitions && 'transition-colors']
    }
  }, ...(options.theme.colors || []).map(color => ({
    color,
    variant: 'pill',
    active: true,
    class: {
      link: `text-${color}`,
      linkLeadingIcon: `text-${color} group-data-[state=open]:text-${color}`
    }
  })), {
    color: 'neutral',
    variant: 'pill',
    active: true,
    class: {
      link: 'text-highlighted',
      linkLeadingIcon: 'text-highlighted group-data-[state=open]:text-highlighted'
    }
  }, {
    variant: 'pill',
    active: true,
    highlight: false,
    class: {
      link: 'before:bg-elevated'
    }
  }, {
    variant: 'pill',
    active: true,
    highlight: true,
    class: {
      link: ['hover:before:bg-elevated/50', options.theme.transitions && 'before:transition-colors']
    }
  }, {
    disabled: false,
    active: false,
    variant: 'link',
    class: {
      link: ['hover:text-highlighted data-[state=open]:text-highlighted', options.theme.transitions && 'transition-colors'],
      linkLeadingIcon: ['group-hover:text-default group-data-[state=open]:text-default', options.theme.transitions && 'transition-colors']
    }
  }, ...(options.theme.colors || []).map(color => ({
    color,
    variant: 'link',
    active: true,
    class: {
      link: `text-${color}`,
      linkLeadingIcon: `text-${color} group-data-[state=open]:text-${color}`
    }
  })), {
    color: 'neutral',
    variant: 'link',
    active: true,
    class: {
      link: 'text-highlighted',
      linkLeadingIcon: 'text-highlighted group-data-[state=open]:text-highlighted'
    }
  }, ...(options.theme.colors || []).map(highlightColor => ({
    highlightColor,
    highlight: true,
    level: true,
    active: true,
    class: {
      link: `after:bg-${highlightColor}`
    }
  })), {
    highlightColor: 'neutral',
    highlight: true,
    level: true,
    active: true,
    class: {
      link: 'after:bg-inverted'
    }
  }],
  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary',
    variant: 'pill'
  }
})

const contentSearch = {
  slots: {
    modal: 'sm:max-w-3xl sm:h-[28rem]',
    input: '[&>input]:text-base/5'
  }
}

const contentSearchButton = {
  slots: {
    base: '',
    trailing: 'hidden lg:flex items-center gap-0.5 ms-auto'
  }
}

const contentSurround = options => ({
  slots: {
    root: 'grid grid-cols-1 sm:grid-cols-2 gap-8',
    link: ['group block px-6 py-8 rounded-lg border border-default hover:bg-elevated/50 focus-visible:outline-primary', options.theme.transitions && 'transition-colors'],
    linkLeading: ['inline-flex items-center rounded-full p-1.5 bg-elevated group-hover:bg-primary/10 ring ring-accented mb-4 group-hover:ring-primary/50', options.theme.transitions && 'transition'],
    linkLeadingIcon: ['size-5 shrink-0 text-highlighted group-hover:text-primary', options.theme.transitions && 'transition-[color,translate]'],
    linkTitle: 'font-medium text-[15px] text-highlighted mb-1 truncate',
    linkDescription: 'text-sm text-muted line-clamp-2'
  },
  variants: {
    direction: {
      left: {
        linkLeadingIcon: [options.theme.transitions && 'group-active:-translate-x-0.5']
      },
      right: {
        link: 'text-right',
        linkLeadingIcon: [options.theme.transitions && 'group-active:translate-x-0.5']
      }
    }
  }
})

const contentToc = options => ({
  slots: {
    root: 'sticky top-(--ui-header-height) z-10 bg-default/75 lg:bg-[initial] backdrop-blur -mx-4 px-4 sm:px-6 sm:-mx-6 overflow-y-auto max-h-[calc(100vh-var(--ui-header-height))]',
    container: 'pt-4 sm:pt-6 pb-2.5 sm:pb-4.5 lg:py-8 border-b border-dashed border-default lg:border-0 flex flex-col',
    top: '',
    bottom: 'mt-6 hidden lg:flex lg:flex-col gap-6',
    trigger: 'group text-sm font-semibold flex-1 flex items-center gap-1.5 py-1.5 -mt-1.5 focus-visible:outline-primary',
    title: 'truncate',
    trailing: 'ms-auto inline-flex gap-1.5 items-center',
    trailingIcon: 'size-5 transform transition-transform duration-200 shrink-0 group-data-[state=open]:rotate-180 lg:hidden',
    content: 'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden focus:outline-none',
    list: 'min-w-0',
    listWithChildren: 'ms-3',
    item: 'min-w-0',
    itemWithChildren: '',
    link: 'group relative text-sm flex items-center focus-visible:outline-primary py-1',
    linkText: 'truncate',
    indicator: 'absolute ms-2.5 transition-[translate,height] duration-200 h-(--indicator-size) translate-y-(--indicator-position) w-px rounded-full'
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, ''])),
      neutral: ''
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map(color => [color, {
        indicator: `bg-${color}`
      }])),
      neutral: {
        indicator: 'bg-inverted'
      }
    },
    active: {
      false: {
        link: ['text-muted hover:text-default', options.theme.transitions && 'transition-colors']
      }
    },
    highlight: {
      true: {
        list: 'ms-2.5 ps-4 border-s border-default',
        item: '-ms-px'
      }
    }
  },
  compoundVariants: [...(options.theme.colors || []).map(color => ({
    color,
    active: true,
    class: {
      link: `text-${color}`,
      linkLeadingIcon: `text-${color}`
    }
  })), {
    color: 'neutral',
    active: true,
    class: {
      link: 'text-highlighted',
      linkLeadingIcon: 'text-highlighted'
    }
  }],
  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary'
  }
})

const themeContent = {
  __proto__: null,
  contentNavigation: contentNavigation,
  contentSearch: contentSearch,
  contentSearchButton: contentSearchButton,
  contentSurround: contentSurround,
  contentToc: contentToc
}

function getTemplates(options, uiOptions, nuxt) {
  const templates = []
  let hasProse = false
  let hasContent = false
  function writeThemeTemplate(theme2, path) {
    for (const component in theme2) {
      templates.push({
        filename: `ui-pro/${path ? path + '/' : ''}${kebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = theme2[component]
          const result = typeof template === 'function' ? template(uiOptions) : template
          const variants = Object.entries(result.variants || {}).filter(([_, values]) => {
            const keys = Object.keys(values)
            return keys.some(key => key !== 'true' && key !== 'false')
          }).map(([key]) => key)
          let json = JSON.stringify(result, null, 2)
          for (const variant of variants) {
            json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`)
            json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
              const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`)
              return `${before}${replaced}${after}`
            })
          }
          function generateVariantDeclarations(variants2) {
            return variants2.map((variant) => {
              const keys = Object.keys(result.variants[variant])
              return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`
            })
          }
          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`
          ].join('\n\n')
        }
      })
    }
  }
  if (!!nuxt && (hasNuxtModule('@nuxtjs/mdc') || options.mdc || (hasNuxtModule('@nuxt/content') || options.content))) {
    hasProse = true
    const path = 'prose'
    writeThemeTemplate(themeProse, path)
    templates.push({
      filename: `ui-pro/${path}/index.ts`,
      write: true,
      getContents: () => Object.keys(themeProse).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
    })
  }
  if (!!nuxt && (hasNuxtModule('@nuxt/content') || options.content)) {
    hasContent = true
    writeThemeTemplate(themeContent, 'content')
  }
  writeThemeTemplate(theme$1)
  templates.push({
    filename: 'ui-pro.css',
    write: true,
    getContents: () => `@source "./ui-pro";`
  })
  templates.push({
    filename: 'ui-pro/index.ts',
    write: true,
    getContents: () => {
      let contents = Object.keys(theme$1).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
      if (hasContent) {
        contents += '\n'
        contents += Object.keys(themeContent).map(component => `export { default as ${component} } from './content/${kebabCase(component)}'`).join('\n')
      }
      if (hasProse) contents += `
export * as prose from './prose'
`
      return contents
    }
  })
  templates.push({
    filename: 'types/ui-pro.d.ts',
    getContents: () => `import * as uiPro from '#build/ui-pro'
import type { TVConfig } from '@nuxt/ui'

type AppConfigUIPro = TVConfig<typeof uiPro>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Nuxt UI Pro theme configuration
     * @see https://ui.nuxt.com/getting-started/theme#customize-theme
     */
    uiPro?: AppConfigUIPro
  }
}

export {}
`
  })
  return templates
}
function addTemplates(options, nuxt) {
  const templates = getTemplates(options, nuxt.options.ui, nuxt)
  for (const template of templates) {
    if (template.filename.endsWith('.d.ts')) {
      addTypeTemplate(template)
    } else {
      addTemplate(template)
    }
  }
}

const icons = {
  arrowUp: 'i-lucide-arrow-up',
  arrowDown: 'i-lucide-arrow-down',
  caution: 'i-lucide-circle-alert',
  copy: 'i-lucide-copy',
  copyCheck: 'i-lucide-copy-check',
  dark: 'i-lucide-moon',
  error: 'i-lucide-circle-x',
  eye: 'i-lucide-eye',
  eyeOff: 'i-lucide-eye-off',
  file: 'i-lucide-file-text',
  folder: 'i-lucide-folder',
  folderOpen: 'i-lucide-folder-open',
  hash: 'i-lucide-hash',
  info: 'i-lucide-info',
  light: 'i-lucide-sun',
  menu: 'i-lucide-menu',
  panelClose: 'i-lucide-panel-left-close',
  panelOpen: 'i-lucide-panel-left-open',
  reload: 'i-lucide-rotate-ccw',
  stop: 'i-lucide-square',
  success: 'i-lucide-circle-check',
  system: 'i-lucide-monitor',
  tip: 'i-lucide-lightbulb',
  warning: 'i-lucide-triangle-alert'
}

async function validateLicense(opts) {
//   if (!opts.key) {
//     throw _createError(`Missing \`${opts.theme.env}\` license key.
// Purchase Nuxt UI Pro at \`${opts.theme.link}\` to build your app in production.`);
//   }
  const gitInfo = opts.key !== 'oss' ? void 0 : await _getLocalGitInfo(opts.dir) || _getGitEnv()
  const projectName = gitInfo ? `${gitInfo.owner || ''}/${gitInfo.name || ''}` : await _getPkgName(opts.dir)
  try {
    // await ofetch("https://api.nuxtlabs.com/ui-pro/verify", {
    //   headers: {
    //     "Authorization": `key ${opts.key}`,
    //     "x-nuxt-project": projectName
    //   },
    //   params: gitInfo ? {
    //     gitRepo: gitInfo.name,
    //     gitOrg: gitInfo.owner,
    //     gitUrl: gitInfo.url
    //   } : {}
    // });
    return
  } catch (error) {
    const statusType = Math.round(error.status / 100)
    //     if (statusType === 4) {
    //       throw _createError(`Invalid \`${opts.theme.env}\` license key.
    // Purchase Nuxt UI Pro at \`${opts.theme.link}\` to build your app in production.`);
    //     }
    //     throw _createError("Cannot validate Nuxt UI Pro License: " + error);
    return
  }
}
function _createError(message) {
  const error = new Error(message)
  try {
    error.stack = ''
  } catch {
  }
  return error
}
async function _getLocalGitInfo(rootDir) {
  const remote = await _getLocalGitRemote(rootDir)
  if (!remote) {
    return
  }
  const gitUrlParse = await import('git-url-parse').then(r => r.default || r)
  const { name, owner, source } = gitUrlParse(remote)
  const url = `https://${source}/${owner}/${name}`
  return {
    name,
    owner,
    url
  }
}
async function _getLocalGitRemote(dir) {
  try {
    const parsed = await readGitConfig(dir)
    if (!parsed) {
      return
    }
    return parsed.remote?.['origin']?.url
  } catch {
    return
  }
}
function _getGitEnv() {
  const envInfo = {
    // Provider
    provider: process.env.VERCEL_GIT_PROVIDER || (process.env.GITHUB_SERVER_URL ? 'github' : void 0),
    // github
    // Owner
    owner: process.env.VERCEL_GIT_REPO_OWNER || process.env.GITHUB_REPOSITORY_OWNER || process.env.CI_PROJECT_PATH?.split('/').shift(),
    // gitlab
    // Name
    name: process.env.VERCEL_GIT_REPO_SLUG || process.env.GITHUB_REPOSITORY?.split('/').pop() || process.env.CI_PROJECT_PATH?.split('/').splice(1).join('/'),
    // gitlab
    // Url
    url: process.env.REPOSITORY_URL
    // netlify
  }
  if (!envInfo.url && envInfo.provider && envInfo.owner && envInfo.name) {
    envInfo.url = `https://${envInfo.provider}.com/${envInfo.owner}/${envInfo.name}`
  }
  if (!envInfo.name || !envInfo.owner || !envInfo.url) {
    return
  }
  return {
    name: envInfo.name,
    owner: envInfo.owner,
    url: envInfo.url
  }
}
async function _getPkgName(dir) {
  if (process.env.npm_package_name) {
    return process.env.npm_package_name
  }
  const projectPkg = await readPackageJSON(dir).catch(() => null)
  if (projectPkg?.name) {
    return projectPkg.name
  }
  throw new Error('You must provide a `name` in your `package.json` to activate Nuxt UI Pro.')
}

const name = '@nuxt/ui-pro'
const version = '3.1.1'
const theme = {
  env: 'NUXT_UI_PRO_LICENSE',
  link: 'https://ui.nuxt.com/pro/pricing'
}

export { version as a, addTemplates as b, getTemplates as g, icons as i, name as n, theme as t, validateLicense as v }
