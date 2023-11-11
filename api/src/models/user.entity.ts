import crypto from 'crypto';
import { HydratedDocument } from 'mongoose';
// import { ObjectId } from 'mongodb';
import { UserType } from '@shared/types/user.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  id: string;

  @Prop()
  name: string;

  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop({ nullable: true })
  phone?: string;

  @Prop({ nullable: true })
  password?: string;

  @Prop({ nullable: true })
  google: string;

  @Prop({ nullable: true })
  facebook: string;

  @Prop({ default: Date.now() })
  lastActive: Date;

  @Prop({ default: Date.now() })
  dateOfBirth: Date;

  @Prop({ default: Date.now() })
  passwordChangedAt: Date;

  @Prop({ nullable: true })
  ocupation: string;

  @Prop({ nullable: true })
  aboutMe: string;

  @Prop({ nullable: true, default: false })
  isPrivate: boolean;

  @Prop({ nullable: true, default: false })
  isRemoved: boolean;

  @Prop({ nullable: true, default: false })
  registrationComplete: boolean;

  @Prop({ default: UserType.USER })
  role: `${UserType}`;

  toJSON() {
    delete this.password;
    return this;
  }

  checkPassword() {
    if (this.password) {
      // this.passwordConfirm = undefined;
      // this.passwordChangedAt = Date.now() - 1000;
    }
  }

  createPasswordResetToken = function () {
    const resetToken = Math.floor(Math.random() * 100000);

    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken.toString())
      .digest('hex');

    this.passwordResetExpires = Date.now() + 100000 * 60 * 1000;

    return this.passwordResetToken;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.changedPasswordAfterAt = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = +this.passwordChangedAt.getTime() / 1000;
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

export const UserForFeature = { name: User.name, schema: UserSchema };
