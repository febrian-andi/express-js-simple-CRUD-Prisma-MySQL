-- CreateTable
CREATE TABLE `employees` (
    `id_employee` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `job` VARCHAR(255) NOT NULL,
    `salary` INTEGER NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id_employee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
