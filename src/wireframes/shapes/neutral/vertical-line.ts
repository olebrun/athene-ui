import { Vec2 } from '@appcore';

import { Constraint, DiagramShape } from '@app/wireframes/model';

import { AbstractContext, AbstractControl } from '@app/wireframes/shapes/utils/abstract-control';

import { CommonTheme } from './_theme';

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_COLOR] = CommonTheme.CONTROL_BORDER_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_THICKNESS] = 2;

class BorderWidthConstraint implements Constraint {
    public static readonly INSTANCE = new BorderWidthConstraint();

    public updateSize(shape: DiagramShape, size: Vec2): Vec2 {
        const strokeThickness = shape.appearance.get(DiagramShape.APPEARANCE_STROKE_THICKNESS);

        return new Vec2(strokeThickness, size.y);
    }

    public calculateSizeX(): boolean {
        return true;
    }

    public calculateSizeY(): boolean {
        return false;
    }
}

export class VerticalLine extends AbstractControl {
    public identifier(): string {
        return 'VerticalLine';
    }

    public previewOffset() {
        return new Vec2(24, 0);
    }

    public createDefaultShape(shapeId: string): DiagramShape {
        return DiagramShape.createShape(shapeId, this.identifier(), 2, 50, undefined, DEFAULT_APPEARANCE, BorderWidthConstraint.INSTANCE);
    }

    protected renderInternal(ctx: AbstractContext) {
        const textItem = ctx.renderer.createRoundedRectangle(ctx.bounds, ctx.shape, 0);

        ctx.renderer.setBackgroundColor(textItem, ctx.shape.appearance.get(DiagramShape.APPEARANCE_STROKE_COLOR));

        ctx.add(textItem);
    }
}