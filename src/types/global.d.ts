interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

declare global {
	interface Navigator {
		standalone?: boolean
	}
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent
	}
}

export {}
