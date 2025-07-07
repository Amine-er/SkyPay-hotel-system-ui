import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, UserPlus, ArrowLeft } from 'lucide-react';

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // For demonstration, we'll simulate a successful signup
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful user creation
      setSuccess(
        'Account created successfully! Please sign in with your credentials.'
      );
      setSignupData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigate('/signin');
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupInputChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign up to get started with your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="amine"
                    value={signupData.firstName}
                    onChange={handleSignupInputChange}
                    className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSignup(e)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="errabi"
                    value={signupData.lastName}
                    onChange={handleSignupInputChange}
                    className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSignup(e)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="amine.errabi@example.com"
                    value={signupData.email}
                    onChange={handleSignupInputChange}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSignup(e)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={handleSignupInputChange}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSignup(e)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupInputChange}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSignup(e)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleSignup}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    navigate('/signin');
                    setError('');
                    setSuccess('');
                  }}
                  className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-800 font-medium hover:underline mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default SignUpPage;
