import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1682576737512 implements MigrationInterface {
    name = 'CreateTables1682576737512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "is_admin" boolean NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" uuid NOT NULL, "date_time" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL DEFAULT 'Agendado', "userId" uuid, "barberId" uuid, "specialtyId" uuid, "availableTimesId" uuid, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialty" ("id" uuid NOT NULL, "name" character varying NOT NULL, "attributed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9cf4ae334dc4a1ab1e08956460e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barber" ("id" uuid NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "hiring_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_393a066f1a87c8642e776ba7054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "available_times" ("id" uuid NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "8:00" boolean NOT NULL DEFAULT true, "8:30" boolean NOT NULL DEFAULT true, "9:00" boolean NOT NULL DEFAULT true, "9:30" boolean NOT NULL DEFAULT true, "10:00" boolean NOT NULL DEFAULT true, "10:30" boolean NOT NULL DEFAULT true, "11:00" boolean NOT NULL DEFAULT true, "11:30" boolean NOT NULL DEFAULT true, "12:00" boolean NOT NULL DEFAULT true, "12:30" boolean NOT NULL DEFAULT true, "13:00" boolean NOT NULL DEFAULT true, "13:30" boolean NOT NULL DEFAULT true, "14:00" boolean NOT NULL DEFAULT true, "14:30" boolean NOT NULL DEFAULT true, "15:00" boolean NOT NULL DEFAULT true, "15:30" boolean NOT NULL DEFAULT true, "16:00" boolean NOT NULL DEFAULT true, "16:30" boolean NOT NULL DEFAULT true, "17:00" boolean NOT NULL DEFAULT true, "17:30" boolean NOT NULL DEFAULT true, "18:00" boolean NOT NULL DEFAULT true, "barberId" uuid, CONSTRAINT "PK_a5b96a4a1e3b3937225f46e0798" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barber_specialties_specialty" ("barberId" uuid NOT NULL, "specialtyId" uuid NOT NULL, CONSTRAINT "PK_fa2c412cf0a0803ed92d946c17e" PRIMARY KEY ("barberId", "specialtyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d4bd63b73878895a25c60f755" ON "barber_specialties_specialty" ("barberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb323f2b25cf73ad240a7840a7" ON "barber_specialties_specialty" ("specialtyId") `);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_d796103491cf0bae197dda59477" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_c587d2819789c0da182e13c41bc" FOREIGN KEY ("barberId") REFERENCES "barber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_ed9265147beb9da21e773da1fb9" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_b6afc774862185c0d4f6898d2b9" FOREIGN KEY ("availableTimesId") REFERENCES "available_times"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "available_times" ADD CONSTRAINT "FK_0c765104371d6444a6239ff62a7" FOREIGN KEY ("barberId") REFERENCES "barber"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "barber_specialties_specialty" ADD CONSTRAINT "FK_9d4bd63b73878895a25c60f7555" FOREIGN KEY ("barberId") REFERENCES "barber"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "barber_specialties_specialty" ADD CONSTRAINT "FK_bb323f2b25cf73ad240a7840a76" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barber_specialties_specialty" DROP CONSTRAINT "FK_bb323f2b25cf73ad240a7840a76"`);
        await queryRunner.query(`ALTER TABLE "barber_specialties_specialty" DROP CONSTRAINT "FK_9d4bd63b73878895a25c60f7555"`);
        await queryRunner.query(`ALTER TABLE "available_times" DROP CONSTRAINT "FK_0c765104371d6444a6239ff62a7"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_b6afc774862185c0d4f6898d2b9"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_ed9265147beb9da21e773da1fb9"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_c587d2819789c0da182e13c41bc"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_d796103491cf0bae197dda59477"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb323f2b25cf73ad240a7840a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d4bd63b73878895a25c60f755"`);
        await queryRunner.query(`DROP TABLE "barber_specialties_specialty"`);
        await queryRunner.query(`DROP TABLE "available_times"`);
        await queryRunner.query(`DROP TABLE "barber"`);
        await queryRunner.query(`DROP TABLE "specialty"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
