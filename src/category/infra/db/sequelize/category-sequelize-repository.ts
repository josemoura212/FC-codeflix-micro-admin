import { Op } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/erros/not-found.error";
import { Uuid } from "../../../../shared/domain/velue-objects/uuid-vo";
import { Category } from "../../../domain/category-entity";
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from "../../../domain/category-repository";
import { CategoryModel } from "./category-model";

export class CategorySequelizeRepository implements ICategoryRepository {
    sortableFields: string[] = ["name", "created_at"];

    constructor(private categoryModel: typeof CategoryModel) {

    }

    async insert(entity: Category): Promise<void> {
        await this.categoryModel.create({
            category_id: entity.category_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at
        })
    }
    async bulkInsert(entities: Category[]): Promise<void> {
        await this.categoryModel.bulkCreate(
            entities.map((entity) => ({
                category_id: entity.category_id.id,
                name: entity.name,
                description: entity.description,
                is_active: entity.is_active,
                created_at: entity.created_at
            }))
        );
    }
    async update(entity: Category): Promise<void> {
        const id = entity.category_id.id;
        const model = await this._get(id);
        if (!model) {
            throw new NotFoundError(id, this.getEntity());
        }
        model.name = entity.name;
        model.description = entity.description;
        model.is_active = entity.is_active;
        model.created_at = entity.created_at;
        await model.save();

        // this.categoryModel.update({
        //     name: entity.name,
        //     description: entity.description,
        //     is_active: entity.is_active,
        //     created_at: entity.created_at
        // }, {
        //     where: { category_id: id }
        // });
    }
    async delete(entity_id: Uuid): Promise<void> {
        const id = entity_id.id;
        const model = await this._get(id);
        if (!model) {
            throw new NotFoundError(id, this.getEntity());
        }
        await model.destroy();

        // await this.categoryModel.destroy({
        //     where: { category_id: id }
        // });
    }

    private async _get(id: string) {
        return await this.categoryModel.findByPk(id);
    }
    async findById(entity_id: Uuid): Promise<Category | null> {
        const model = await this._get(entity_id.id);
        if (!model) {
            return null;
        }
        return new Category({
            category_id: new Uuid(model.category_id),
            name: model.name,
            description: model.description,
            is_active: model.is_active,
            created_at: model.created_at,
        });
    }
    async findAll(): Promise<Category[]> {
        const models = await this.categoryModel.findAll();
        return models.map((model) => new Category({
            category_id: new Uuid(model.category_id),
            name: model.name,
            description: model.description,
            is_active: model.is_active,
            created_at: model.created_at,
        }));
    }
    getEntity(): new (...args: any[]) => Category {
        return Category;
    }

    async search(props: CategorySearchParams): Promise<CategorySearchResult> {
        const offset = (props.page - 1) * props.per_page;
        const { rows: models, count } = await this.categoryModel.findAndCountAll({
            ...(props.filter && {
                where: {
                    name: {
                        [Op.like]: `%${props.filter}%`
                    }
                }
            }),
            ...(props.sort && this.sortableFields.includes(props.sort)
                ? { order: [[props.sort, props.sort_dir]] }
                : { order: [["created_at", "desc"]] }
            ),
            offset,
            limit: props.per_page
        });

        return new CategorySearchResult({
            items: models.map((model) => new Category({
                category_id: new Uuid(model.category_id),
                name: model.name,
                description: model.description,
                is_active: model.is_active,
                created_at: model.created_at,
            })),
            total: count,
            current_page: props.page,
            per_page: props.per_page,
        });
    }

}