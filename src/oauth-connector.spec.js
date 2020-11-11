window.location = 'http://localhost/'

import oauthConnector from './oauth-connector'

describe('checkRedirect', () => {
  describe('when no params are present', () => {
    it('does not redirect the window', () => {
      oauthConnector.checkRedirect('')
      expect(oauthConnector.redirecting).toBe(false)
      expect(window.location.toString()).toEqual('http://localhost/')
    })

    it('does not redirect with non-matching params', () => {
      oauthConnector.checkRedirect('error_not=notAnOauthError')
      expect(oauthConnector.redirecting).toBe(false)
      expect(window.location.toString()).toEqual('http://localhost/')
    })
  })

  describe('when any params are present', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        set: jest.fn(),
        get: jest.fn(),
      })
    })
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('redirects the window when `code` is passed in', () => {
      const windowLocationSpy = jest.spyOn(window, 'location', 'set')

      oauthConnector.checkRedirect('code=xyz987')

      expect(oauthConnector.redirecting).toBe(true)
      expect(windowLocationSpy).toHaveBeenCalled()
      expect(
        windowLocationSpy.mock.calls[0].indexOf(
          'https://api.cloudsponge.com/auth?code=xyz987'
        )
      ).toBeGreaterThanOrEqual(0)
    })

    it('redirects the window when `state` is passed in', () => {
      const windowLocationSpy = jest.spyOn(window, 'location', 'set')

      oauthConnector.checkRedirect('state=xyz987')

      expect(oauthConnector.redirecting).toBe(true)
      expect(windowLocationSpy).toHaveBeenCalled()
      expect(
        windowLocationSpy.mock.calls[0].indexOf(
          'https://api.cloudsponge.com/auth?state=xyz987'
        )
      ).toBeGreaterThanOrEqual(0)
    })

    it('redirects the window when `error` is passed in', () => {
      const windowLocationSpy = jest.spyOn(window, 'location', 'set')

      oauthConnector.checkRedirect('error=bad_news')

      expect(oauthConnector.redirecting).toBe(true)
      expect(windowLocationSpy).toHaveBeenCalled()
      expect(
        windowLocationSpy.mock.calls[0].indexOf(
          'https://api.cloudsponge.com/auth?error=bad_news'
        )
      ).toBeGreaterThanOrEqual(0)
    })

    it('redirects the window when `error_code` is passed in', () => {
      const windowLocationSpy = jest.spyOn(window, 'location', 'set')

      oauthConnector.checkRedirect('error_code=4xx')

      expect(oauthConnector.redirecting).toBe(true)
      expect(windowLocationSpy).toHaveBeenCalled()
      expect(
        windowLocationSpy.mock.calls[0].indexOf(
          'https://api.cloudsponge.com/auth?error_code=4xx'
        )
      ).toBeGreaterThanOrEqual(0)
    })
  })
})
