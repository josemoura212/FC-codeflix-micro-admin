import { Category } from "../category.entity";

describe("Category Unit Tests", () => { 
    describe("constructor", () => {

        test("should create a category with default values", () => {
            const category = new Category({
                name: "Movie",
            })

            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test("should create a category with all properties", () => {

            const created_at = new Date();

            const category = new Category({
                name: "Movie",
                description: "some description",
                is_active: false,
                created_at
            })
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe("Movie");
            expect(category.description).toBe("some description");
            expect(category.is_active).toBe(false);
            expect(category.created_at).toBe(created_at);
        });

        test("should create a category with only name and description", () => {
        const category = new Category({
            name: "Movie",
            description: "some description",
        })
        expect(category.category_id).toBeUndefined();
        expect(category.name).toBe("Movie");
        expect(category.description).toBe("some description");
        expect(category.is_active).toBe(true);
        expect(category.created_at).toBeInstanceOf(Date);
    });
        
    })
});