import { before } from "lodash";
import { Uuid } from "../../../shared/domain/velue-objects/uuid-vo";
import { Category } from "../category-entity";
import { EntityValidationError } from "../../../shared/domain/validators/validation.error";

describe("Category Unit Tests", () => {
  let validateSpy: jest.SpyInstance;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  describe("constructor", () => {
    test("should create a category with default values", () => {
      const category = new Category({
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with all values", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Movie",
        description: "Movie description",
        is_active: false,
        created_at,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });
    test("should create a category with name and description", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("create command", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "some description",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("some description");
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a category with is_active", () => {
      const category = Category.create({
        name: "Movie",
        is_active: false,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ]

    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        category_id: category_id as any,
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(
          category_id
        );
      }
    });
  });

  test("should change name", () => {
    const category = Category.create({
      name: "Movie",
    });
    category.changeName("other name");
    expect(category.name).toBe("other name");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test("should change description", () => {
    const category = Category.create({
      name: "Movie",
    });
    category.changeDescription("some description");
    expect(category.description).toBe("some description");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test("should active a category", () => {
    const category = Category.create({
      name: "Filmes",
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should disable a category", () => {
    const category = Category.create({
      name: "Filmes",
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toBe(false);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});

describe("Category Validator", () => {
  describe("Create Command", () => {
    test("should validate a invalid name", () => {
      expect(() => {
        Category.create({
          name: "",
        });
      }).toThrow(new EntityValidationError({ name: ["Name should not be empty"] }));
    })
  });
});
