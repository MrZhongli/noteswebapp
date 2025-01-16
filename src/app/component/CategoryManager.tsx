'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Category } from '../types/Note'

export default function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([])
    const [newCategory, setNewCategory] = useState('')

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8023/categories')
            if (!response.ok) {
                throw new Error('Failed to fetch categories')
            }
            const data: Category[] = await response.json()
            setCategories(data)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCategory.trim()) return

        try {
            const response = await fetch('http://localhost:8023/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategory }),
            })

            if (!response.ok) {
                throw new Error('Failed to add category')
            }

            const addedCategory: Category = await response.json()
            setCategories([...categories, addedCategory])
            setNewCategory('')
        } catch (error) {
            console.error('Error adding category:', error)
        }
    }

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            const response = await fetch(`http://localhost:8023/categories/${categoryId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete category')
            }

            setCategories(categories.filter(category => category.id !== categoryId))
        } catch (error) {
            console.error('Error deleting category:', error)
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Manage Categories</h3>
            <form onSubmit={handleAddCategory} className="flex space-x-2">
                <Input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                />
                <Button type="submit">Add</Button>
            </form>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <li key={category.id} className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

