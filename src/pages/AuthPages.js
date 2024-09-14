import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../auth'
import { Link, useLocation } from 'wouter'

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const WelcomePanel = styled.div`
  background-color: #ffffff;
  margin-top: 24px;
  min-height: 80px;
  border-top: 1px solid #f2f2f2;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.063);
  display: flex;
  align-items: center;
  justify-content: center;
`

const WelcomeText = styled.div`
  font-size: 24px;
  color: #666666;
  font-weight: 300;
  display: flex;
  align-items: center;
`

const GlyphLogo = styled.div`
  font-size: 40px;
  color: #000000;
`

const Accent = styled.div`
  color: #e02d1f;
  font-weight: 400;
`

const Divider = styled.div`
  width: 1px;
  height: 32px;
  background-color: #e5e5e5;
  margin-left: 16px;
  margin-right: 16px;
`

const LoginFormContainer = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  padding: 0 16px;
`

const LoginFormSpaceBefore = styled.div`
  flex: 2;
`

const LoginFormSpaceAfter = styled.div`
  flex: 3;
  min-height: 8px;
`

const VerticalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  gap: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
`

const VerticalForm = VerticalContainer.withComponent('form')

const Header = styled.h1`
  font-size: 32px;
  color: #4a4a4a;
  font-weight: 500;
  margin-top: 16px;
  margin-bottom: 8px;
`

const FieldsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  color: #666666;
  font-weight: 500;
`

const HelperText = styled.div`
  font-size: 12px;
  color: #666666;
  text-align: center;
`

const ErrorText = styled(HelperText)`
  color: #ff0000;
`

const TextInput = styled.input`
  display: block;
  box-sizing: border-box;
  color: #333333;
  background-color: #ffffff;
  border: 1px solid #666666;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  outline: none;
`

const SubmitButton = styled.button`
  background-color: #6e7c42;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  height: auto;
  line-height: 22px;
  outline: none;
  padding: 7px 18px;
  text-align: center;
  //text-transform: uppercase;
  width: 100%;
`

const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const RadioInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #666666;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  outline: none;

  &:checked::before {
    content: '';
    width: 10px;
    height: 10px;
    background-color: #4a4a4a;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    border-color: #0056b3;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(127, 127, 127, 0.25);
  }
`

const RadioLabel = styled.span`
  font-size: 16px;
  color: #333;
`

const RadioButton = ({ label, ...props }) => (
  <RadioWrapper>
    <RadioInput type="radio" {...props} />
    <RadioLabel htmlFor={props.id}>{label}</RadioLabel>
  </RadioWrapper>
)

const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
`

const FooterLink = styled.a`
  color: #4a4a4a;
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  //margin-top: 16px;
`

const WelcomeBanner = () => (
  <WelcomePanel>
    <WelcomeText>
      <GlyphLogo className="material-icons">ac_unit</GlyphLogo>
      <Accent>UWU</Accent>
      <Divider />
      EZCharge
    </WelcomeText>
  </WelcomePanel>
)

export const LoginPage = ({ onLogin }) => {
  const [gpn, setGpn] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleGpnChange = useCallback((event) => {
    setGpn(event.target.value)
  }, [])

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      login(gpn, password)

      onLogin()
    },
    [gpn, password]
  )

  return (
    <AppContainer>
      <WelcomeBanner />
      <LoginFormContainer>
        <LoginFormSpaceBefore />
        <VerticalForm onSubmit={handleSubmit}>
          <Header>Log in</Header>
          <FieldsGroup>
            <Label htmlFor="gpn">GPN</Label>
            <TextInput type="number" id="gpn" name="gpn" value={gpn} onChange={handleGpnChange} required />
          </FieldsGroup>
          <FieldsGroup>
            <Label htmlFor="password">Password</Label>
            <TextInput
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </FieldsGroup>
          <SubmitButton type="submit">Log in</SubmitButton>
          <Link to="/sign-up" asChild>
            <FooterLink>Sign up</FooterLink>
          </Link>
          <Link to="/forgot-password" asChild>
            <FooterLink>Forgot your password?</FooterLink>
          </Link>
        </VerticalForm>
        <LoginFormSpaceAfter />
      </LoginFormContainer>
    </AppContainer>
  )
}

export const SignUpPage = ({ onLogin }) => {
  const [location, setLocation] = useLocation()

  const [gpn, setGpn] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = React.useState(null)

  const [vehicleName, setVehicleName] = React.useState('')
  const [vehiclePlateNumber, setVehiclePlateNumber] = React.useState('')

  const [emailSent, setEmailSent] = React.useState(false)

  const handleGpnChange = useCallback((event) => {
    setGpn(event.target.value)
  }, [])

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value)
  }, [])

  const handlePasswordConfirmationChange = useCallback((event) => {
    setPasswordConfirmation(event.target.value)
  }, [])

  const handleVehicleNameChange = useCallback((event) => {
    setVehicleName(event.target.value)
  }, [])

  const handleVehiclePlateNumberChange = useCallback((event) => {
    setVehiclePlateNumber(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters long')
        return
      } else {
        setPasswordError(null)
      }

      if (password !== passwordConfirmation) {
        setPasswordConfirmationError('Passwords do not match')
        return
      } else {
        setPasswordConfirmationError(null)
      }

      setEmailSent(true)
    },
    [gpn, password, passwordConfirmation]
  )

  return (
    <AppContainer>
      <WelcomeBanner />
      <LoginFormContainer>
        <LoginFormSpaceBefore />
        {!emailSent && (
          <VerticalForm onSubmit={handleSubmit}>
            <Header>Sign up</Header>
            <FieldsGroup>
              <Label htmlFor="gpn">GPN</Label>
              <TextInput type="number" id="gpn" name="gpn" value={gpn} onChange={handleGpnChange} required />
            </FieldsGroup>
            <FieldsGroup>
              <Label htmlFor="password">Password</Label>
              <TextInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && <ErrorText>{passwordError}</ErrorText>}
            </FieldsGroup>
            <FieldsGroup>
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <TextInput
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
                required
              />
              {passwordConfirmationError && <ErrorText>{passwordConfirmationError}</ErrorText>}
            </FieldsGroup>
            <FieldsGroup>
              <Label htmlFor="vehicleName">Vehicle Name</Label>
              <TextInput
                type="text"
                id="vehicleName"
                name="vehicleName"
                value={vehicleName}
                onChange={handleVehicleNameChange}
                required
              />
            </FieldsGroup>
            <FieldsGroup>
              <Label htmlFor="vehiclePlateNumber">Vehicle Plate Number</Label>
              <TextInput
                type="text"
                id="vehiclePlateNumber"
                name="vehiclePlateNumber"
                value={vehiclePlateNumber}
                onChange={handleVehiclePlateNumberChange}
                required
              />
            </FieldsGroup>
            <FieldsGroup>
              <Label htmlFor="vehiclePlateNumber">Vehicle Charger Port</Label>
              <RadioGroup>
                <RadioButton id="type-1" name="option" value="1" label="Type 1" />
                <RadioButton id="type-2" name="option" value="2" label="Type 2" />
                <RadioButton id="type-3" name="option" value="1+2" label="Both" />
              </RadioGroup>
              <HelperText>You will be able to add more vehicles after registration.</HelperText>
            </FieldsGroup>
            <SubmitButton type="submit">Sign up</SubmitButton>
            <Link to="/" asChild>
              <FooterLink>Log in</FooterLink>
            </Link>
          </VerticalForm>
        )}
        {emailSent && (
          <VerticalContainer>
            <Header>Email sent</Header>
            <p>We have sent you an email with instructions on how to complete your registration.</p>
            <Link to="/" asChild>
              <FooterLink>Log in</FooterLink>
            </Link>
          </VerticalContainer>
        )}
        <LoginFormSpaceAfter />
      </LoginFormContainer>
    </AppContainer>
  )
}

export const RecoverPasswordPage = () => {
  const [gpn, setGpn] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailSent, setEmailSent] = React.useState(false)

  const handleGpnChange = useCallback((event) => {
    setGpn(event.target.value)
  }, [])

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      setEmailSent(true)
    },
    [gpn, email]
  )

  return (
    <AppContainer>
      <WelcomeBanner />
      <LoginFormContainer>
        <LoginFormSpaceBefore />
        {!emailSent && (
          <VerticalForm onSubmit={handleSubmit}>
            <Header>Recover password</Header>
            <FieldsGroup>
              <Label htmlFor="gpn">GPN</Label>
              <TextInput type="number" id="gpn" name="gpn" value={gpn} onChange={handleGpnChange} required />
            </FieldsGroup>
            <FieldsGroup>
              <Label htmlFor="email">Email</Label>
              <TextInput type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
            </FieldsGroup>
            <SubmitButton type="submit">Submit</SubmitButton>
            <Link to="/" asChild>
              <FooterLink>Log in</FooterLink>
            </Link>
          </VerticalForm>
        )}
        {emailSent && (
          <VerticalContainer>
            <Header>Email sent</Header>
            <p>We have sent you an email with instructions on how to recover your password.</p>
            <Link to="/" asChild>
              <FooterLink>Log in</FooterLink>
            </Link>
          </VerticalContainer>
        )}
        <LoginFormSpaceAfter />
      </LoginFormContainer>
    </AppContainer>
  )
}
