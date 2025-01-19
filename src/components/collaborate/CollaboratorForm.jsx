import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronRight, ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from "zod";

const collaborationOptions = [
    "Stubble purchasing company",
    "Machine rental",
    "Transportation company",
    "Agriculture shops"
];

const stepTitles = [
    "Company Information",
    "Company Details",
    "Confirmation"
];

const formSchema = z.object({
    collaborationType: z.enum(collaborationOptions),
    companyName: z.string().min(1, "Company name is required"),
    name: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    companyAddress: z.string().min(1, "Company address is required"),
    companyDescription: z.string().optional(),
    query: z.string().optional(),
    crops: z.array(z.object({
        cropName: z.string().min(1, "Crop name is required"),
        priceRangeFrom: z.string().min(1, "Price range from is required"),
        priceRangeTo: z.string().min(1, "Price range to is required"),
    })).optional(),
});

export default function CollaboratorForm() {
    const [step, setStep] = useState(1);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            collaborationType: "Stubble purchasing company",
            companyName: "",
            name: "",
            email: "",
            phoneNumber: "",
            companyAddress: "",
            companyDescription: "",
            query: "",
            crops: [{ cropName: "", priceRangeFrom: "", priceRangeTo: "" }],
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "crops",
    });

    const onSubmit = (data) => {
        console.log(data);
        // Here you would typically send the data to your backend
        alert("Form submitted successfully!");
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            form.handleSubmit(onSubmit)();
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen font-raleway flex items-center justify-center p-4">
            <motion.div 
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative mb-12">
                    <div className="flex justify-between">
                        {stepTitles.map((title, index) => (
                            <div key={index} className="flex flex-col items-center relative z-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step > index ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'} mb-2 transition-all duration-300 ease-in-out transform ${step === index + 1 ? 'scale-110 ring-4 ring-emerald-200' : ''}`}>
                                    {step > index ? <Check className="w-6 h-6" /> : index + 1}
                                </div>
                                <span className={`text-lg font-medium ${step > index ? 'text-emerald-600' : 'text-gray-600'} transition-colors duration-300`}>{title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-6 left-0 w-full h-1 bg-gray-200">
                        <motion.div
                            className="h-full bg-emerald-600 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((step - 1) / (stepTitles.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {step === 1 && (
                                <div className="grid md:grid-cols-1 mx-auto gap-8">
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <select
                                                {...form.register("collaborationType")}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            >
                                                {collaborationOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {['companyName', 'name', 'email', 'phoneNumber', 'companyAddress'].map((field) => (
                                            <div key={field} className="space-y-2">
                                                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                                </label>
                                                <input
                                                    id={field}
                                                    type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                                                    {...form.register(field)}
                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                />
                                                {form.formState.errors[field] && (
                                                    <p className="text-red-500 text-sm">{form.formState.errors[field]?.message}</p>
                                                )}
                                            </div>
                                        ))}
                                        <button type="button" onClick={handleNext} className="w-full bg-emerald-600 text-white p-2 rounded-md">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                                        <h3 className="font-semibold text-xl mb-4 text-emerald-700">Company Details</h3>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            {['collaborationType', 'companyName', 'name', 'email', 'phoneNumber', 'companyAddress'].map((field) => (
                                                <p key={field} className="flex items-start">
                                                    <span className="font-medium text-gray-700 mr-2">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</span>
                                                    <span className="text-gray-600">{form.watch(field)}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">Describe your company</label>
                                            <textarea
                                                id="companyDescription"
                                                {...form.register("companyDescription")}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out h-32 resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="query" className="block text-sm font-medium text-gray-700">Any queries?</label>
                                            <textarea
                                                id="query"
                                                {...form.register("query")}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out h-24 resize-none"
                                            />
                                        </div>
                                        {form.watch("collaborationType") === "Stubble purchasing company" && (
                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-lg text-emerald-700">Crop Information</h4>
                                                {fields.map((field, index) => (
                                                    <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                                                        <div className="space-y-2">
                                                            <label htmlFor={`crops.${index}.cropName`} className="block text-sm font-medium text-gray-700">Crop Name</label>
                                                            <input
                                                                {...form.register(`crops.${index}.cropName`)}
                                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                            />
                                                            {form.formState.errors.crops?.[index]?.cropName && (
                                                                <p className="text-red-500 text-sm">{form.formState.errors.crops[index]?.cropName?.message}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex space-x-4">
                                                            <div className="space-y-2 w-1/2">
                                                                <label htmlFor={`crops.${index}.priceRangeFrom`} className="block text-sm font-medium text-gray-700">Price Range From</label>
                                                                <input
                                                                    type="number"
                                                                    {...form.register(`crops.${index}.priceRangeFrom`)}
                                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                                />
                                                                {form.formState.errors.crops?.[index]?.priceRangeFrom && (
                                                                    <p className="text-red-500 text-sm">{form.formState.errors.crops[index]?.priceRangeFrom?.message}</p>
                                                                )}
                                                            </div>
                                                            <div className="space-y-2 w-1/2">
                                                                <label htmlFor={`crops.${index}.priceRangeTo`} className="block text-sm font-medium text-gray-700">Price Range To</label>
                                                                <input
                                                                    type="number"
                                                                    {...form.register(`crops.${index}.priceRangeTo`)}
                                                                    className="w-full p-2 border border-gray-300 rounded-md"
                                                                />
                                                                {form.formState.errors.crops?.[index]?.priceRangeTo && (
                                                                    <p className="text-red-500 text-sm">{form.formState.errors.crops[index]?.priceRangeTo?.message}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="mt-2 bg-red-500 text-white p-2 rounded-md"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2 inline" />
                                                                Remove Crop
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => append({ cropName: "", priceRangeFrom: "", priceRangeTo: "" })} className="mt-4 bg-gray-200 text-gray-700 p-2 rounded-md">
                                                    <Plus className="w-4 h-4 mr-2 inline" />
                                                    Add Another Crop
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-700 p-2 rounded-md">
                                            <ChevronLeft className="w-5 h-5 mr-2 inline" />
                                            Back
                                        </button>
                                        <button type="submit" onClick={handleNext} className="bg-emerald-600 text-white p-2 rounded-md">
                                            Next
                                            <ChevronRight className="w-5 h-5 ml-2 inline" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="text-center space-y-8">
                                    <div className="flex justify-center">
                                        <div className="bg-emerald-500 rounded-full p-6 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
                                            <Check className="text-white w-20 h-20" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-emerald-700">Thank You for Collaborating!</h2>
                                    <p className="text-xl text-gray-600 max-w-md mx-auto">We're excited to work with you. We'll contact you soon to discuss the next steps and how we can grow together.</p>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}