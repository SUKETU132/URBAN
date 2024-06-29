import React, { useState } from 'react'
import Input from "../../Input";
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { login as LoginUser } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from "../../MongoDB/auth";
import { WarningBanner } from '../Information/Warning';
import Success from '../Information/Success';
import { useForm } from "react-hook-form";
import VerifyOtp from "../VerifyOtp";
import LoadingSpinner from '../Loading/LoadingSpinner';

export default function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [wantVerification, setWantVerification] = useState(false);
    const [otpVerification, setOtpVerification] = useState(false);

    const login = async (data) => {
        setError("");
        setMsg("");
        setIsLoading(true);
        try {
            setEmail(data.email);
            const user = await authService.login(data);
            if (user) {
                setMsg("Login successFull");
                dispatch(LoginUser(data));
                navigate("/");
            } else {
                setError("Please verify your email first and then login again.");
                setWantVerification(true);
                return;
            }
        } catch (error) {
            setError("Password is not valid");
            return;
        } finally {
            setIsLoading(false);
        }
    }

    const handleForgotPassword = async () => {
        setMsg("");
        setError("");
        try {
            const { email } = getValues();
            const result = await authService.requestPasswordReset({ email });
            if (result.success) {
                setMsg(result.message);
                setError(null);
            } else {
                setMsg(null);
                setError(result.message);
            }
        } catch (err) {
            setMsg(null);
            setError(err.message);
        }
    }

    return (
        <section>
            {isLoading && <LoadingSpinner />}
            {!otpVerification ? (<div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" version="1" id="cloth">
                            <path fill="#f37a5d" fill-rule="evenodd" d="M32 16c0 8.824-7.176 16-16 16S0 24.824 0 16 7.176 0 16 0s16 7.176 16 16z" clip-rule="evenodd"></path><path d="M18.273 31.77c.313-.045.642-.033.948-.096a15.868 15.868 0 0 0 5.718-2.41 16.12 16.12 0 0 0 5.801-7.041c.406-.957.72-1.962.934-3.002.039-.19.026-.396.058-.588L20.537 7.438a.326.326 0 0 0-.082-.063l-1.336-.363-.668-.668v.12l-.181.73-.487-.487H15.78l.098.402-.766-.765-.91.547h-.06l-1.336.484c-.122.06-.243.183-.182.365l-2.732 5.645c-.061.06-.061.183 0 .304l2.671 5.89c.014.025.03.048.05.067l.355.356H12.38l-.79 4.857a.289.289 0 0 0-.009.147c.003.017.012.03.018.047a.26.26 0 0 0 .043.076c.005.006.006.016.011.021l6.62 6.62z" opacity=".25"></path><path fill="#fff" d="M18.451 6.344v.12l-1.396 5.586v13.113c0 .182-.122.303-.304.303s-.303-.182-.303-.303V11.868l-1.336-5.403v-.121l-.91.546h-.061l-1.336.486c-.121.06-.243.182-.182.364l-2.732 5.646c-.06.06-.06.182 0 .303l2.671 5.889c.122.243.547.182.547-.06.303-1.276.303-2.186.607-2.915h1.335c.183 0 .304.122.304.304l-.06 2.124c0 .061 0 .122-.061.183l-.547.667a.46.46 0 0 1-.243.122h-2.063l-.79 4.856c-.06.183.06.365.243.365 3.035.546 6.192.607 9.41 0 .182-.061.242-.182.242-.365-.242-1.578-.424-3.278-.667-4.917h-2.125c-.122 0-.182-.06-.243-.121l-.546-.668c-.061-.06-.061-.122-.061-.182l-.06-2.125c0-.182.181-.304.303-.304h1.457c.182 1.032.425 2.064.485 3.097 0 .182.183.303.304.303h1.518c.182 0 .303-.182.303-.303-.303-4.007-.182-8.257-1.517-11.838.06-.183-.061-.365-.183-.425L19.12 7.01l-.668-.667zm-.668.364H15.78l.971 4.006 1.032-4.006zm-4.674 5.646c.425.91.668 1.942.364 3.278l-.971-2.186.607-1.092z"></path></svg>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gr  ay-600 ">
                        Don&apos;t have an account?{' '}
                        <a
                            href="/signup"
                            title=""
                            className="font-semibold text-black transition-all duration-200 hover:underline"
                        >
                            Create a free account
                        </a>
                    </p>
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    {errors.email && <p className="text-red-500 mt-2 mb-3">Email is required</p>}
                                    <Input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", {
                                            required: true,
                                            validate: {
                                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                    "Email address must be a valid address",
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Password{' '}
                                    </label>
                                    <a href="#" title="" onClick={() => handleForgotPassword()} className="text-sm font-semibold text-black hover:underline">
                                        {' '}
                                        Forgot password?{' '}
                                    </a>
                                </div>
                                <div className="mt-2">
                                    {errors.password && <p className="text-red-500 mt-2 mb-3">Password is required</p>}
                                    <Input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-orange-500/80"
                                >
                                    Login <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                            {wantVerification && <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    onClick={() => setOtpVerification(true)}
                                >
                                    Verify OTP <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>}
                        </div>
                    </form>
                    {msg && <Success msg={msg} />}
                    {error && <WarningBanner warning={error} />}
                </div>

            </div>) : (<VerifyOtp email={email} />)}
        </section >
    )
}
