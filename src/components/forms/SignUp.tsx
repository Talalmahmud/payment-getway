"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { signup } from "@/app/actions"; // Adjust the import path as needed

interface FormData {
  email: string;
  password: string;
  role: string;
}

interface FormErrors {
  email: string;
  password: string;
  role: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
    role: "",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    let valid = true;
    let errors: FormErrors = { email: "", password: "", role: "" };

    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.role) {
      errors.role = "Role is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (validate()) {
      try {
        const formDataObj = new FormData();
        formDataObj.append("email", formData.email);
        formDataObj.append("password", formData.password);
        formDataObj.append("role", formData.role);
        await signup(formDataObj);
        setSubmitError(null); // Clear any previous errors
      } catch (error) {
        setSubmitError("Failed to submit the form. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign Up
      </h2>
      {submitError && (
        <div className="mb-4 text-red-500 text-sm text-center">
          {submitError}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && (
          <span className="text-red-500 text-xs italic">{errors.email}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && (
          <span className="text-red-500 text-xs italic">{errors.password}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Role:
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.role && (
          <span className="text-red-500 text-xs italic">{errors.role}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign Up
      </button>
      <div className="mt-4 text-center">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Already have an account? Login
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
