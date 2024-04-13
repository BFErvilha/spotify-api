declare global {
	interface BeforeInstallPromptEvent extends Event {
		prompt(): Promise<void>
		userChoice: Promise<{
			outcome: 'accepted' | 'dismissed'
			platform: string
		}>
	}
}

export {}
